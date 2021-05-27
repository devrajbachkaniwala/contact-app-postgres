import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ICreateUser } from './src/interfaces/user.interface';
import { IContact } from './src/interfaces/Contact.interface';
import { ILabel } from './src/interfaces/Label.interface';
import { IContactLabel } from './src/interfaces/contact-label.interface';
import { IContactCompany } from './src/interfaces/contact-company.interface';

config();

const app = express();
const PORT = (process.env.PORT as any) as number;

app.use(cors('*'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/', (req: express.Request, res: express.Response) => {
    /* const user: ICreateUser = {
        userId: 40,
        userName: 'DamonUpdated',
        email: 'damon@damonUpdate.com',
        password: 'damon123Update',
    } */
    //User.create(user).then(user => console.log(user), err => console.log(err));
    //User.list().then(user => console.log(user), err => console.log(err));
    //User.update(user).then(user => console.log(user), err => console.log(err));
    //User.delete(24).then(user => console.log(user), err => console.log(err));

    /* const contact: IContact = {
        companyId: 1,
        userId: 37,
        contactId: 20,
        firstName: 'Lexi',
        lastName: 'Rivera',
        dateOfBirth: new Date('2001-02-10'),
        modifiedAt: new Date()
    } */
    //Contact.create(36, contact).then( res => console.log(res), err => console.log(err));
    //Contact.list(37).then( res => console.log(res), err => console.log(err));
    //Contact.get(37, 21).then( res => console.log(res), err => console.log(err));
    //Contact.update(37, contact).then( res => console.log(res), err => console.log(err));
    //Contact.delete(37, 22).then( res => console.log(res), err => console.log(err));
    
    /* const label: ILabel = {
        userId: 36,
        labelId: 3,
        labelName: 'NEW UPDATED LABEL',
        modifiedAt: new Date()
    } */
    //Label.create(36, label).then( res => console.log(res), err => console.log(err));
    //Label.get(36).then( res => console.log(res), err => console.log(err));
    //Label.list().then( res => console.log(res), err => console.log(err));
    //Label.update(36, label).then( res => console.log(res), err => console.log(err));
    //Label.delete(36, 3).then( res => console.log(res), err => console.log(err));
    


    //ContactLabel.get(36, 1).then(res => console.log(res), err => console.log(err));
    //ContactLabel.list(36, 23).then(res => console.log(res), err => console.log(err));
    //ContactLabel.create(23, 2).then(res => console.log(res), err => console.log(err));
    //ContactLabel.delete(20, 1).then(res => console.log(res), err => console.log(err));

    const contactCompany: IContactCompany = {
        companyId: 4,
        company: 'NewCompany',
        jobTitle: 'CEO',
        department: 'Manager'
    }
    //ContactCompany.create(37, 23, contactCompany).then(res => console.log(res), err => console.log(err));
    //ContactCompany.list(37, 1).then(res => console.log(res), err => console.log(err));
    //ContactCompany.get(37, 20).then(res => console.log(res), err => console.log(err));

    res.send('Hello from server');
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));