import { db } from "../database/db";
import { IContactSocial } from "../interfaces/contact-social.interface";

export class ContactSocial {
    static async get(socialId: number): Promise<IContactSocial[]> {
        try {
            const contactSocial: IContactSocial[] = (await db.read.columns('*').tables('ContactSocials').where('socialId', '=', socialId).get()).rows;
            return contactSocial;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    static async list(): Promise<IContactSocial[]> {
        try {
            const contactSocial: IContactSocial[] = (await db.read.columns('*').tables('ContactSocials').get()).rows;
            return contactSocial;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    static async create(contactSocial: IContactSocial): Promise<{ message: string }> {
        try {
            const newContactSocial: number = (await db.write.table('ContactSocials').insert(contactSocial).execute()).rowCount;
            return (newContactSocial == 1) ? { message : 'Contact social added successfully' } : { message : 'Failed to add contact social' };
        } catch(err) {
            throw new Error(err);
        }
    }
    
    static async update(contactSocial: IContactSocial): Promise<{ message: string }> {
        try {
            const updatedContactSocial: number = (await db.update.table('ContactSocials').update(contactSocial).where('socialId', '=', contactSocial.socialId).execute()).rowCount;
            return (updatedContactSocial == 1) ? { message : 'Contact social updated successfully' } : { message : 'Failed to update contact social' };
        } catch(err) {
            throw new Error(err);
        }
    }

    static async delete(socialId: number): Promise<{ message: string }> {
        try {
            const contactSocial: number = (await db.delete.table('ContactSocials').where('socialId', '=', socialId).delete()).rowCount;
            return (contactSocial == 1) ? { message : 'Contact social deleted successfully' } : { message : 'Failed to delete contact social' };
        } catch(err) {
            throw new Error(err);
        }
    }
}