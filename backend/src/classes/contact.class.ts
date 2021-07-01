import { db } from '../database/db';
import { IContact } from '../interfaces/contact.interface';

export default class Contact {
    // returns a specific contact of a user using contactId and userId of that user
    static async get(userId: number, contactId: number): Promise<IContact[]> {
        try {
            const contact: IContact[] = (await db.read.columns('*').tables('Contacts').where('userId', '=', userId).where('contactId', '=', contactId, false).get()).rows;
            return contact;
        } catch(err) {
            throw err;
        }
    }
    
    // returns a list of contacts of a specific user using userId of that user
     static async list(userId: number): Promise<IContact[]> {
        try {
            const contacts: IContact[] = (await db.read.columns('*').tables('Contacts').where('userId', '=', userId).get()).rows;
            return contacts;
        } catch(err) {
            throw err;
        }
    }
    
    // create a new contact
    static async create(contact: IContact): Promise<{ message: string, result: boolean }> {
        try {
            const newContact: number = (await db.write.table('Contacts').insert(contact).execute()).rowCount;
            return (newContact == 1 ) ? { message : 'New contact created successfully', result : true } : { message : 'Failed to create contact', result : false };
        } catch(err) {
            throw err;
        }
    }

    // update an existing contact
    static async update(contact: IContact): Promise<{ message: string, result: boolean }> {
        try {
            const updatedContact: number = (await db.update.table('Contacts').update(contact).where('contactId', '=', contact.contactId).execute()).rowCount ;
            return (updatedContact == 1 ) ? { message : 'Contact updated successfully', result : true } : { message : 'Failed to update contact', result : false };
        } catch(err) {
            throw err;
        }
    }
    
    // delete a specific contact using its contactId
    static async delete(contactId: number): Promise<{ message: string, result: boolean}> {
        try {
           const contact: number = (await db.delete.table('Contacts').where('contactId', '=', contactId).delete()).rowCount;
           return (contact == 0) ? { message : 'Contact deleted successfully', result : true} : { message : 'Failed to delete contact', result : false};
        } catch(err) {
           throw err;
        }
     } 
}
