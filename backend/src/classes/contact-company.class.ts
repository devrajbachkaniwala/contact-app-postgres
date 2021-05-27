import { pool } from '../database/db';
import { IContactCompany } from '../interfaces/contact-company.interface';

export default class ContactCompany {
    //Get company of a contact that belongs to a user;
    static async get(userId: number, contactId: number): Promise<IContactCompany[]> {
        try {
            const contactCompany: IContactCompany[] = (await pool.query("SELECT Contacts.contactId, ContactCompanies.companyId, company, jobTitle, department, ContactCompanies.createdAt, ContactCompanies.modifiedAt FROM Contacts, ContactCompanies, Users WHERE Users.userId = Contacts.userId AND Contacts.companyId = ContactCompanies.companyId AND Users.userId = $1 AND Contacts.contactId = $2", [ userId, contactId ])).rows ;
            return contactCompany;
        } catch(err) {
            
        }
    }

    //Get contact of a company that belongs to a user;
    static async list(userId: number, companyId: number): Promise<IContactCompany[]> {
        try {
            const contactCompany: IContactCompany[] = (await pool.query("SELECT Contacts.contactId, ContactCompanies.companyId, company, jobTitle, department, ContactCompanies.createdAt, ContactCompanies.modifiedAt FROM Contacts, ContactCompanies, Users WHERE Users.userId = Contacts.userId AND Contacts.companyId = ContactCompanies.companyId AND Users.userId = $1 AND ContactCompanies.companyId = $2", [ userId, companyId ])).rows ;
            return contactCompany;
        } catch(err) {

        }
    }
    
    //Create contact of a company that belongs to a user;
    static async create(userId: number, contactId: number, contactCompany: IContactCompany): Promise<{}> {
        try {
            const newContactCompany: IContactCompany[] = (await pool.query("INSERT INTO ContactCompanies (companyId, company, jobTitle, department) VALUES ($1, $2, $3, $4) RETURNING companyId, company, jobTitle, department, createdAt, modifiedAt", [ contactCompany.companyId, contactCompany.company, contactCompany.jobTitle, contactCompany.department])).rows ;
            const updateContact = (await pool.query("UPDATE Contacts SET companyId = $1 WHERE userId = $2 AND contactId = $3", [contactCompany.companyId, userId, contactId ])).rows;
            return { newContactCompany, updateContact };
        } catch(err) {
            
        }
    }
    
}