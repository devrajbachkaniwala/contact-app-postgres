import { db } from "../database/db";
import { IContactSocial } from "../interfaces/contact-social.interface";

export class ContactSocial {
    // returns a specific contactSocial using its socialId
    static async get(socialId: number): Promise<IContactSocial[]> {
        try {
            const contactSocial: IContactSocial[] = (await db.read.columns('*').tables('ContactSocials').where('socialId', '=', socialId).get()).rows;
            return contactSocial;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns a specific contactSocial using contactId
    static async getByContactId(contactId: number): Promise<IContactSocial[]> {
        try {
            const contactSocial: IContactSocial[] = (await db.read.columns('*').tables('ContactSocials').where('contactId', '=', contactId).get()).rows;
            return contactSocial;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a list of contactSocials
    static async list(): Promise<IContactSocial[]> {
        try {
            const contactSocial: IContactSocial[] = (await db.read.columns('*').tables('ContactSocials').get()).rows;
            return contactSocial;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // create a new contactSocial
    static async create(contactSocial: IContactSocial): Promise<{ message: string, result: boolean }> {
        try {
            const newContactSocial: number = (await db.write.table('ContactSocials').insert(contactSocial).execute()).rowCount;
            return (newContactSocial == 1) ? { message : 'Contact social added successfully', result : true } : { message : 'Failed to add contact social', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // update an existing contactSocial
    static async update(contactSocial: IContactSocial): Promise<{ message: string, result: boolean }> {
        try {
            const updatedContactSocial: number = (await db.update.table('ContactSocials').update(contactSocial).where('socialId', '=', contactSocial.socialId).execute()).rowCount;
            return (updatedContactSocial == 1) ? { message : 'Contact social updated successfully', result : true } : { message : 'Failed to update contact social', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete a specific contactSocial using its socialId
    static async delete(socialId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactSocial: number = (await db.delete.table('ContactSocials').where('socialId', '=', socialId).delete()).rowCount;
            return (contactSocial == 1) ? { message : 'Contact social deleted successfully', result : true } : { message : 'Failed to delete contact social', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}