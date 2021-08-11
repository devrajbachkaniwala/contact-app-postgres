import { Router } from "express";
import jwt from 'jsonwebtoken';
import { ContactAddress } from "../classes/contact-address.class";
import { ContactEmailAddress } from "../classes/contact-email-address.class";
import ContactLabel from "../classes/contact-label.class";
import { ContactNote } from "../classes/contact-note.class";
import { ContactSocial } from "../classes/contact-social.class";
import { ContactTelephone } from "../classes/contact-telephone.class";
import { ContactWebsite } from "../classes/contact-website.class";
import Contact, { ContactAddressModel, ContactEmailAddressModel, ContactLabelModel, ContactModel, ContactNoteModel, ContactSocialModel, ContactTelephoneModel, ContactWebsiteModel } from "../classes/contact.class";
import Label from "../classes/label.class";
import { db } from "../database/db";
import { IContactAddress } from "../interfaces/contact-address.interface";
import { IContactEmailAddress } from "../interfaces/contact-email-address.interface";
import { IContactLabel } from "../interfaces/contact-label.interface";
import { IContactNote } from "../interfaces/contact-note.interface";
import { IContactSocial } from "../interfaces/contact-social.interface";
import { IContactTelephone } from "../interfaces/contact-telephone.interface";
import { IContactWebsite } from "../interfaces/contact-website.interface";
import { IContact, IContactModel } from "../interfaces/contact.interface";
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
        const contacts: Object = await Contact.listContacts(userId);
        res.json(contacts);
    } catch (err) {
        throw new Error(err);
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

        const contact: Object = await Contact.getContact(userId, contactId);
        res.json(contact);
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
        const contact: IContactModel = req.body.contact;

        const newContact = contactConstructor(contact);

        const result = await Contact.createContact(newContact);
        res.json(result);
    } catch (err) {
        throw new Error(err);
    }
});

/* 
 *
 * contactConstructor function takes contact and strictly makes contact object through its appropriately models
 * 
 * 
*/
function contactConstructor(contact, isUpdating?: boolean) {
    const newContact = new ContactModel(contact.userId, contact.contactId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event, contact.company, contact.jobTitle, contact.department);
    ( isUpdating ) ? newContact.modifiedat = new Date() : '' ;
    let contactTelephones = [];
    let contactAddresses = [];
    let contactEmailAddresses = [];
    let contactNotes = [];
    let contactSocials = [];
    let contactWebsites = [];
    let contactLabels = [];

    let total = contact.telephones?.length;
    for (let i = 0; i < total; i++) {
        const telephones = contact.telephones[i];
        const telephone = new ContactTelephoneModel(telephones.contactId, telephones.telephoneId, telephones.countryCode, telephones.number);
        switch( isUpdating ) {
            case true:
                telephone.modifiedat = new Date();
                break;
        }
        contactTelephones.push(telephone);
    }

    total = contact.addresses?.length
    for (let i = 0; i < total; i++) {
        const addresses = contact.addresses[i];
        const address = new ContactAddressModel(addresses.contactId, addresses.addressId, addresses.country, addresses.state, addresses.city, addresses.streetAddress, addresses.streetAddressLine2, addresses.pincode, addresses.poBox, addresses.type);
        ( isUpdating ) ? address.modifiedat = new Date() : '' ;
        contactAddresses.push(address);
    }

    total = contact.emailAddresses?.length;
    for (let i = 0; i < total; i++) {
        const emailAddresses = contact.emailAddresses[i];
        const emailAddress = new ContactEmailAddressModel(emailAddresses.contactId, emailAddresses.emailAddressId, emailAddresses.email);
        ( isUpdating ) ? emailAddress.modifiedat = new Date() : '' ;
        contactEmailAddresses.push(emailAddress);
    }

    total = contact.notes?.length;
    for (let i = 0; i < total; i++) {
        const notes = contact.notes[i];
        const note = new ContactNoteModel(notes.contactId, notes.noteId, notes.content);
        ( isUpdating ) ? note.modifiedat = new Date() : '' ;
        contactNotes.push(note);
    }

    total = contact.socials?.length;
    for (let i = 0; i < total; i++) {
        const socials = contact.socials[i];
        const social = new ContactSocialModel(socials.contactId, socials.socialId, socials.whatsapp, socials.facebook, socials.twitter, socials.snapchat);
        contactSocials.push(social);
    }

    total = contact.websites?.length;
    for (let i = 0; i < total; i++) {
        const websites = contact.websites[i];
        const website = new ContactWebsiteModel(websites.contactId, websites.websiteId, websites.websiteName);
        ( isUpdating ) ? website.modifiedat = new Date() : '' ;
        contactWebsites.push(website);
    }

    total = contact.labels?.length;
    for (let i = 0; i < total; i++) {
        const labels = contact.labels[i];
        const contactLabel = new ContactLabelModel(labels.contactId, labels.labelId);
        contactLabels.push(contactLabel);
    }

    return {
        newContact,
        contactTelephones,
        contactAddresses,
        contactEmailAddresses,
        contactNotes,
        contactSocials,
        contactWebsites,
        contactLabels
    };
}

/* 
 *
 * Update an existing contact
 * 
 * 
*/
router.put('/:contactId', verifyToken, async (req, res) => {
    try {
        const contactId: number = +req.params.contactId;
        const userId: number = res.locals.user.subject;
        const contact: IContactModel = req.body.contact;
        const updatedContact = contactConstructor(contact, true);
    
        const result = await Contact.updateContact(userId, contactId, updatedContact);
        res.json(result);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * Delete a specific contact using contactId
 * 
 * 
*/
router.delete('/:contactId', verifyToken, async (req, res) => {
    try {
        const userId: number = res.locals.user.subject;
        const contactId: number = +req.params.contactId;
        const result = await Contact.delete(userId, contactId);
        res.json(result);
    } catch(err) {
        throw new Error(err);
    }
});

/* 
 *
 * verifyToken function verifies the token from the client and if it is correct then the decrypted result is assigned to res.locals.user and then next middleware is called 
 * or if it is incorrect then invalid token is sent to the client or if token is null then unauthorizeed user it sent to the client
 * 
*/
export function verifyToken(req, res, next) {
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