import { db } from '../database/db';
import { IContact } from '../interfaces/contact.interface';

export default class Contact {
    static async get(userId: number, contactId: number): Promise<IContact[]> {
        try {
            const contact: IContact[] = (await db.read.columns('*').tables('Contacts').where('userId', '=', userId).where('contactId', '=', contactId, false).get()).rows;
            return contact;
        } catch(err) {
            throw err;
        }
    }
    
     static async list(userId: number): Promise<IContact[]> {
        try {
            const contacts: IContact[] = (await db.read.columns('*').tables('Contacts').where('userId', '=', userId).get()).rows;
            return contacts;
        } catch(err) {
            throw err;
        }
    }
    
    
    static async create(userId: number, contact: IContact): Promise<{ message: string }> {
        try {
            const newContact: number = (await db.write.table('Contacts').insert(contact).execute()).rowCount;
            return (newContact == 1 ) ? { message : 'New contact created successfully' } : { message : 'Failed to create contact' };
        } catch(err) {
            throw err;
        }
    }
    static async update(userId: number, contact: IContact): Promise<{ message: string }> {
        try {
            const updatedContact: number = (await db.update.table('Contacts').update(contact).where('contactId', '=', contact.contactId).execute()).rowCount ;
            return (updatedContact == 1 ) ? { message : 'Contact updated successfully' } : { message : 'Failed to update contact' };
        } catch(err) {
            throw err;
        }
    }
    
    
    static async delete(userId: number, contactId: number): Promise<{ message: string}> {
        try {
           const contact: number = (await db.delete.table('Contacts').where('contactId', '=', contactId).delete()).rowCount;
           return (contact == 0) ? { message : 'Contact deleted successfully'} : { message : 'Failed to delete contact'};
        } catch(err) {
           throw err;
        }
     } 
}
