import { db } from '../database/db';
import { IContactAddress } from '../interfaces/contact-address.interface';

export class ContactAddress {
    static async get(addressId: number): Promise<IContactAddress[]> {
        try {
            const contactAddress: IContactAddress[] = (await db.read.columns('*').tables('ContactAddresses').where('addressId', '=', addressId).get()).rows;
            return contactAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async list(): Promise<IContactAddress[]> {
        try {
            const contactAddress: IContactAddress[] = (await db.read.columns('*').tables('ContactAddresses').get()).rows;
            return contactAddress;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async create(contactAddress: IContactAddress): Promise<{ message: string }> {
        try {
            const newContactAddress: number = (await db.write.table('ContactAddresses').insert(contactAddress).execute()).rowCount;
            return ( newContactAddress == 1 ) ? { message : 'New contact address created successfully' } : { message : 'Failed to create contact address' };
        } catch(err) {
            throw new Error(err);
        }
    }

    static async update(contactAddress: IContactAddress): Promise<{ message: string }> {
        try {
            const updatedContactAddress: number = (await db.update.table('ContactAddresses').update(contactAddress).where('addressId', '=', contactAddress.contactId).execute()).rowCount;
            return ( updatedContactAddress == 1 ) ? { message : 'Contact address updated successfully' } : { message : 'Failed to update contact address' };
        } catch(err) {
            throw new Error(err);
        }
    }

    static async delete(addressId: number): Promise<{ message: string }> {
        try {
            const contactAddress: number = (await db.delete.table('ContactAddresses').where('addressId', '=', addressId).delete()).rowCount;
            return ( contactAddress == 1 ) ? { message : 'Contact address deleted successfully' } : { message : 'Failed to delete contact address' };
        } catch(err) {
            throw new Error(err);
        }
    }
}