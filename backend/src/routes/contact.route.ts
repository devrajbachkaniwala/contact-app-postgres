import { Router } from "express";
import jwt from 'jsonwebtoken';
import { ContactAddress } from "../classes/contact-address.class";
import { ContactEmailAddress } from "../classes/contact-email-address.class";
import ContactLabel from "../classes/contact-label.class";
import { ContactNote } from "../classes/contact-note.class";
import { ContactSocial } from "../classes/contact-social.class";
import { ContactTelephone } from "../classes/contact-telephone.class";
import { ContactWebsite } from "../classes/contact-website.class";
import Contact from "../classes/contact.class";
import Label from "../classes/label.class";
import { IContactAddress } from "../interfaces/contact-address.interface";
import { IContactEmailAddress } from "../interfaces/contact-email-address.interface";
import { IContactLabel } from "../interfaces/contact-label.interface";
import { IContactNote } from "../interfaces/contact-note.interface";
import { IContactSocial } from "../interfaces/contact-social.interface";
import { IContactTelephone } from "../interfaces/contact-telephone.interface";
import { IContactWebsite } from "../interfaces/contact-website.interface";
import { IContact } from "../interfaces/contact.interface";
import { ILabel } from "../interfaces/label.interface";

export const router = Router();

/* 
 *
 * Prefix of this route is /contacts
 *
*/

/*
 *
 * res.locals.user.subject has userId which is used to get the list of contacts of that user using userId  
 *
 *  
*/

router.get('/', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const contact: IContact[] = await Contact.list(userId);

        const contacts = [];

        for (let c of contact) {
            const contactTelephones: IContactTelephone[] = await ContactTelephone.getByContactId(c.contactid);
            const contactLables: IContactLabel[] = await ContactLabel.getByContactID(c.contactid);

            let completeContact = {
                contact: c,
                contactTelephones,
                labels : []
            }

            for (let contactLabel of contactLables) {
                if (contactLabel.contactid == c.contactid) {
                    const labels: ILabel[] = await Label.get(contactLabel.labelid);
                    completeContact['labels'] = labels;
                }
            }

            contacts.push(completeContact);
        }

        res.json(contacts);
    } catch (err) {
        console.log(err);
    }
});

/* 
 *
 * res.locals.user.subject has userId
 * req.params.contactId has contactId which is provided in route parameter
 * By using userId and contactId we can get a particular contact of a particular user
 *  
 * 
*/
router.get('/:contactId', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const contactId: number = +req.params.contactId;
        const contact: IContact[] = await Contact.get(userId, contactId);
        const contactTelephones: IContactTelephone[] = await ContactTelephone.getByContactId(contactId);
        const contactAddresses: IContactAddress[] = await ContactAddress.getByContactId(contactId);
        const contactSocials: IContactSocial[] = await ContactSocial.getByContactId(contactId);
        const contactNotes: IContactNote[] = await ContactNote.getByContactId(contactId);
        const contactEmailAddresses: IContactEmailAddress[] = await ContactEmailAddress.getByContactId(contactId);
        const contactWebsites: IContactWebsite[] = await ContactWebsite.getByContactId(contactId);

        const contactLabels: IContactLabel[] = await ContactLabel.getByContactID(contactId);
        const labelId: number[] = contactLabels.map(item => item.labelid);
        const labels: ILabel[] = [];

        for (let id of labelId) {
            labels.push((await Label.get(id)).pop());
        }


        const completeContact = {
            contact: contact.shift(),
            contactTelephones,
            contactAddresses,
            contactSocials,
            contactNotes,
            contactEmailAddresses,
            contactWebsites,
            labels
        }

        res.json(completeContact);
    } catch (err) {
        throw new Error(err);
    }
});

/* 
 * 
 * 
 * post new contact 
 * 
 * 
*/
router.post('/', verifyToken, async (req, res) => {
    try {
        const contact: IContact = {
            userId : res.locals.user.subject,
            ...req.body.contact
        }
        const newContact: {
            contact: IContact,
            contactTelephones: IContactTelephone[],
            contactAddresses: IContactAddress[],
            contactSocials: IContactSocial[],
            conatctNotes: IContactNote[],
            contactEmailAddresses: IContactEmailAddress[],
            contactWebsites: IContactWebsite[],
            contactLabels: IContactLabel[]
        } = {
            contact,
            contactTelephones : req.body.contactTelephones && [ ...req.body.contactTelephones ],
            contactAddresses : req.body.contactAddresses && [ ...req.body.contactAddresses ],
            contactSocials : req.body.contactSocials && [ ...req.body.contactSocials ],
            conatctNotes : req.body.conatctNotes && [ ...req.body.conatctNotes ],
            contactEmailAddresses : req.body.contactEmailAddresses && [ ...req.body.contactEmailAddresses ],
            contactWebsites : req.body.contactWebsites && [ ...req.body.contactWebsites ],
            contactLabels : req.body.contactSocials && [ ...req.body.contactLabels ]
        };

        const contactResult: { message: string, result: boolean } = await Contact.create(newContact.contact);


        if(newContact.contactTelephones && newContact.contactTelephones.length) {
            newContact.contactTelephones.forEach( async telephone => {
                const contactTelephone = await ContactTelephone.create(telephone);
                if(!contactTelephone.result) {
                    throw new Error(contactTelephone.message);
                }
            });
        }

        if( newContact.contactAddresses && newContact.contactAddresses.length) {
            newContact.contactAddresses.forEach(async address => {
                const contactAddress = await ContactAddress.create(address);
                if(!contactAddress.result) {
                    throw new Error(contactAddress.message);
                }
            });
        }

        

        

        res.json(contactResult.message);

    } catch (err) {
        throw new Error(err);
    }
});

/* 
 *
 * verifyToken function verifies the token from the client and if it is correct then the decrypted result is assigned to res.locals.user and then next middleware is called 
 * or if it is incorrect then invalid token is sent to the client or if token is null then unauthorizeed user it sent to the client
 * 
*/
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token: string = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        res.json({ message: 'Unauthorized user' });
        return;
    }

    jwt.verify(token, 'secret key', (err, result) => {
        if (err) {
            res.json({ message: 'Invalid Token' });
            return;
        }

        res.locals.user = result;
        next();
    });
}