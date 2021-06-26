import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ICreateUser, IUser } from './src/interfaces/user.interface';
import { IContact } from './src/interfaces/contact.interface';
import { ILabel } from './src/interfaces/label.interface';
import { IContactLabel } from './src/interfaces/contact-label.interface';
import User from './src/classes/user.class';
import Contact from './src/classes/contact.class';
import Label from './src/classes/label.class';
import ContactLabel from './src/classes/contact-label.class';
import { IContactTelephone } from './src/interfaces/contact-telephone.interface';
import { ContactTelephone } from './src/classes/contact-telephone.class';
import { ContactAddress } from './src/classes/contact-address.class';
import { IContactAddress } from './src/interfaces/contact-address.interface';
import { IContactSocial } from './src/interfaces/contact-social.interface';
import { ContactSocial } from './src/classes/contact-social.class';
import { IContactNote } from './src/interfaces/contact-note.interface';
import { ContactNote } from './src/classes/contact-note.class';

config();

const app = express();
const PORT = (process.env.PORT as any) as number;

app.use(cors('*'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req: express.Request, res: express.Response) => {    

    const contactLabel: IContactLabel = {
        contactId: 2,
        labelId:  3
    }

    const contact: IContact = {
        userId: 44,
        contactId: 2,
        firstName: 'Test Contact 22'
    }

    const contactTelephone: IContactTelephone = {
        contactId: 2,
        telephoneId: 2,
        countryCode: '+91',
        number: 333333
    }
    
    const contactAddress: IContactAddress = {
        contactId: 2,
        addressId: 2,
        streetAddress: 'update street 2'
    }

    const contactSocial: IContactSocial = {
        contactId: 2,
        socialId: 3,
        whatsapp: 'updatetest3'
    }

    const contactNote: IContactNote = {
        contactId: 2,
        noteId: 3,
        content: 'UPDATE 3'
    }

    ContactNote.list().then( result => {
        res.json(result);
    })
    


});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));