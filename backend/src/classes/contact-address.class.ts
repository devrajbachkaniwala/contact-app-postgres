import { db } from '../database/db';
import { IContactAddress } from '../interfaces/contact-address.interface';

export class ContactAddress {
    // returns a specific contactAddress using its addressId
    static async get(addressId: number): Promise<IContactAddress[]> {
        try {
            const contactAddress: IContactAddress[] = (await db.read.columns('*').tables('ContactAddresses').where('addressId', '=', addressId).get()).rows;
            return contactAddress;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a specific contactAddress using contactId
    static async getByContactId(contactId: number): Promise<IContactAddress[]> {
        try {
            const contactAddress: IContactAddress[] = (await db.read.columns('*').tables('ContactAddresses').where('contactId', '=', contactId).get()).rows;
            return contactAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns a list of contactAddresses
    static async list(): Promise<IContactAddress[]> {
        try {
            const contactAddress: IContactAddress[] = (await db.read.columns('*').tables('ContactAddresses').get()).rows;
            return contactAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    // create a new contactAddress 
    static async create(contactAddress: IContactAddress): Promise<{ message: string, result: boolean }> {
        try {
            const newContactAddress: number = (await db.write.table('ContactAddresses').insert(contactAddress).execute()).rowCount;
            return ( newContactAddress == 1 ) ? { message : 'New contact address created successfully', result : true } : { message : 'Failed to create contact address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // update an existing contactAddress
    static async update(contactAddress: IContactAddress): Promise<{ message: string, result: boolean }> {
        try {
            const updatedContactAddress: number = (await db.update.table('ContactAddresses').update(contactAddress).where('addressId', '=', contactAddress.contactId).execute()).rowCount;
            return ( updatedContactAddress == 1 ) ? { message : 'Contact address updated successfully', result : true } : { message : 'Failed to update contact address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete a specific contactAddress using its addressId
    static async delete(addressId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactAddress: number = (await db.delete.table('ContactAddresses').where('addressId', '=', addressId).delete()).rowCount;
            return ( contactAddress == 1 ) ? { message : 'Contact address deleted successfully', result : true } : { message : 'Failed to delete contact address', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}