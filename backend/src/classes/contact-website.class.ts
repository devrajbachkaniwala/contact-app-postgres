import { db } from "../database/db";
import { IContactWebsite } from "../interfaces/contact-website.interface";

export class ContactWebsite {
    // returns a specific contactWebsite using its websiteId
    static async get(websiteId: number): Promise<IContactWebsite[]> {
        try {
            const contactWebsite: IContactWebsite[] = (await db.read.columns('*').tables('ContactWebsites').where('websiteId', '=', websiteId).get()).rows;
            return contactWebsite;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a specific contactWebsite using contactId 
    static async getByContactId(contactId: number): Promise<IContactWebsite[]> {
        try {
            const contactWebsite: IContactWebsite[] = (await db.read.columns('*').tables('ContactWebsites').where('contactId', '=', contactId).get()).rows;
            return contactWebsite;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a list of contactWebsites
    static async list(): Promise<IContactWebsite[]> {
        try {
            const contactWebsite: IContactWebsite[] = (await db.read.columns('*').tables('ContactWebsites').get()).rows;
            return contactWebsite;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // create a new contactWebsite
    static async create(contactWebsite: IContactWebsite): Promise<{ message: string, result: boolean }> {
        try {
            const newContactWebsite: number =  (await db.write.table('ContactWebsites').insert(contactWebsite).execute()).rowCount ;
            return (newContactWebsite == 1) ? { message : 'Contact website added successfully', result : true } : { message : 'Failed to add contact website', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // update an existing contactWebsite
    static async update(contactWebsite: IContactWebsite): Promise<{ message: string, result: boolean }> {
        try {
            const updateContactWebsite: number =  (await db.update.table('ContactWebsites').update(contactWebsite).where('websiteId', '=', contactWebsite.websiteId).execute()).rowCount ;
            return (updateContactWebsite == 1) ? { message : 'Contact website updated successfully', result : true  } : { message : 'Failed to update contact website', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // delete a specific contactWebsite using its websiteId
    static async delete(websiteId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactWebsite: number =  (await db.delete.table('ContactWebsites').where('websiteId', '=', websiteId).delete()).rowCount ;
            return (contactWebsite == 1) ? { message : 'Contact website deleted successfully', result : true  } : { message : 'Failed to delete contact website', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}