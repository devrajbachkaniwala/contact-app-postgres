import { QueryResult } from "pg";
import { pool } from "../database/db";
import { IContact } from "../interfaces/Contact.interface";

export default class Contact {
    static async get(userId: number, contactId: number): Promise<IContact[]> {
        try {
            const contact: IContact[] = (await pool.query("SELECT companyId, Contacts.userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt FROM Users, Contacts WHERE Users.userId = Contacts.userId AND Contacts.userId = $1 AND Contacts.contactId = $2 ", [ userId, contactId ])).rows;
            return contact;
        } catch(err) {
            throw err;
        }
    }
    
    static async list(userId: number): Promise<IContact[]> {
        try {
            const contacts: IContact[] = (await pool.query("SELECT companyId, Contacts.userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt FROM Users, Contacts WHERE Users.userId = Contacts.userId AND Contacts.userId = $1 ORDER BY Contacts.firstName, Contacts.lastName", [ userId ])).rows;
            return contacts;
        } catch(err) {
            throw err;
        }
    }
    
    static async create(userId: number, contact: IContact): Promise<IContact[]> {
        try {
            const newContact: IContact[] = (await pool.query("INSERT INTO Contacts (companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20 ) RETURNING companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, createdAt, modifiedAt", [ contact.companyId, userId, contact.contactId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event ])).rows;
            return newContact;
        } catch(err) {
            throw err;
        }
    }

    static async update(userId: number, contact: IContact): Promise<IContact[]> {
        try {
            const updatedContact: IContact[] = (await pool.query("UPDATE Contacts SET companyId = $1, contactPhoto = $2, prefix = $3, firstName = $4, middleName = $5, lastName = $6, suffix = $7, phoneticFirst = $8, phoneticMiddle = $9, phoneticLast = $10, nickname = $11, fileAs = $12, dateOfBirth = $13, relationship = $14, chat = $15, internetCall = $16, customField = $17, event = $18, modifiedAt = $19 WHERE Contacts.userId = $20 AND Contacts.contactId = $21 RETURNING companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt", [ contact.companyId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event, contact.modifiedAt, userId, contact.contactId ])).rows;
            return updatedContact;
        } catch(err) {
            throw err;
        }
    }

    static async delete(userId: number, contactId: number): Promise<{ message: string}> {
        try {
            const query: RDBQuery = new RDBQuery();
            query.where('userId', '=', 1).where('userId', '=', 2, true);
           const contact = (await pool.query("DELETE FROM Contacts WHERE Contacts.userId = $1 AND Contacts.contactId = $2", [ userId, contactId ])).rows;
           return (contact.length == 0) ? { message : 'Contact deleted'} : { message : 'Failed to delete contact'};
        } catch(err) {
           throw err;
        }
     }
}

export class RDBQuery {
    private _action: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' = 'SELECT';
    private _where = '';
    private _whereParams: any[] = [];

    execute(): Promise<QueryResult<any>> {
        let query: string = this._action;

        return pool.query(query, []);
    }

    where(param: string, condition: '=' | '>=' | '<=' | '>' | '<' | 'NOT' | '!=', value: string | boolean | number, isOR: boolean = false) {
        if(this._where.length > 0) {
            this._where += isOR  ? ' OR ' : ' AND ';
        }
        this._whereParams.push(value);
        this._where += `${param} ${condition} $${this._whereParams.length}`;
        return this;
    }

}