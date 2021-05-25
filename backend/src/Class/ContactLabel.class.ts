import { pool } from "../database/db";
import { IContactLabel } from "../interfaces/ContactLabel.interface";

export default class ContactLabel {
    //Get list of contactId of a particular labelId that belongs to a user
    static async get(userId: number, labelId: number): Promise<IContactLabel[]> {
        try {
            const contactLabel: IContactLabel[] = (await pool.query("SELECT ContactLabels.contactId, ContactLabels.labelId, Labels.labelName FROM ContactLabels, Contacts, Labels, Users WHERE ContactLabels.contactId = Contacts.contactId AND ContactLabels.labelId = Labels.labelId AND Users.userId = Contacts.userId AND Users.userId = $1 AND Labels.labelId = $2", [ userId, labelId ])).rows;
            return contactLabel;
        } catch(err) {
            throw err;
        }
    }
    
    //Get list of labelId of a particular contactId that belongs to a user
    static async list(userId: number, contactId: number): Promise<IContactLabel[]> {
        try {
            const contactLabels: IContactLabel[] = (await pool.query("SELECT ContactLabels.contactId, ContactLabels.labelId, Labels.labelName FROM ContactLabels, Contacts, Labels, Users WHERE ContactLabels.contactId = Contacts.contactId AND ContactLabels.labelId = Labels.labelId AND Users.userId = Contacts.userId AND Users.userId = $1 AND Contacts.contactId = $2", [ userId, contactId ])).rows;
            return contactLabels;
        } catch(err) {
            throw err;
        }
    }
    
    //Assigns a label to a contact that belongs to a user
    static async create(contactId: number, labelId: number): Promise<IContactLabel[]> {
        try {
            const assignContactLabel: IContactLabel[] = (await pool.query("INSERT INTO ContactLabels (contactId, labelId) VALUES ($1, $2) RETURNING contactId, labelId", [ contactId, labelId ])).rows;
            return assignContactLabel;
        } catch(err) {
            throw err;
        }
    }
    
    //Remove a label from that contact that belongs to a user
    static async delete(contactId: number, labelId: number): Promise<{ message: string}> {
        try {
            const contactLabel: IContactLabel[] = (await pool.query("DELETE FROM ContactLabels WHERE contactId = $1 AND labelId = $2 ", [ contactId, labelId ])).rows;
            return (contactLabel.length == 0) ? { message: 'ContactLabel removed'} : { message: 'Failed to remove contactLabel' };
        } catch(err) {
            throw err;
        }
    }
}