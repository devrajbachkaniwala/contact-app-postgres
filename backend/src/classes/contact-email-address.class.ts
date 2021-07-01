import { db } from "../database/db";
import { IContactEmailAddress } from "../interfaces/contact-email-address.interface";

export class ContactEmailAddress {
    // returns a specific contactEmailAddress using its emailAddressId
    static async get(emailAddressId: number): Promise<IContactEmailAddress[]> {
        try {
            const contactEmailAddress: IContactEmailAddress[] = (await db.read.columns('*').tables('ContactEmailAddresses').where('emailAddressId', '=', emailAddressId).get()).rows;
            return contactEmailAddress;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a specific contactEmailAddress using contactId
    static async getByContactId(contactId: number): Promise<IContactEmailAddress[]> {
        try {
            const contactEmailAddress: IContactEmailAddress[] = (await db.read.columns('*').tables('ContactEmailAddresses').where('contactId', '=', contactId).get()).rows;
            return contactEmailAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns a list of contactEmailAddresses
    static async list(): Promise<IContactEmailAddress[]> {
        try {
            const contactEmailAddress: IContactEmailAddress[] = (await db.read.columns('*').tables('ContactEmailAddresses').get()).rows;
            return contactEmailAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    // create a new contactEmailAddress
    static async create(contactEmailAddress: IContactEmailAddress): Promise<{ message: string, result: boolean }> {
        try {
            const newContactEmailAddress: number = (await db.write.table('ContactEmailAddresses').insert(contactEmailAddress).execute()).rowCount;
            return ( newContactEmailAddress == 1 ) ? { message : 'Contact email address created successfully', result : true } : { message : 'Failed to create contact email address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // update an existing contactEmailAddress
    static async update(contactEmailAddress: IContactEmailAddress): Promise<{ message: string, result: boolean }> {
        try {
            const updateContactEmailAddress: number = ( await db.update.table('ContactEmailAddresses').update(contactEmailAddress).where('emailAddressId', '=', contactEmailAddress.emailAddressId).execute()).rowCount;
            return ( updateContactEmailAddress == 1 ) ? { message : 'Contact email address updated successfully', result : true } : { message : 'Failed to update contact email address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete a specific contactEmailAddress using its emailAddressId
    static async delete(emailAddressId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactEmailAddress: number =  (await db.delete.table('ContactEmailAddresses').where('emailAddressId', '=', emailAddressId).delete()).rowCount ;
            return ( contactEmailAddress == 1 ) ? { message : 'Contact email address deleted successfully', result : true } : { message : 'Failed to delete contact email address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}