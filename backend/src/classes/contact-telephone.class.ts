import { db } from "../database/db";
import { IContactTelephone } from "../interfaces/contact-telephone.interface";


export class ContactTelephone {
    // returns a specific contactTelephone using its telephoneId
    static async get(telephoneId: number): Promise<IContactTelephone[]> {
        try {
            const contactTelephone: IContactTelephone[] = (await db.read.columns('*').tables('ContactTelephones').where('telephoneId', '=', telephoneId).get()).rows;
            return contactTelephone;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a specific contactTelephone using contactId
    static async getByContactId(contactId: number): Promise<IContactTelephone[]> {
        try {
            const contactTelephone: IContactTelephone[] = (await db.read.columns('*').tables('ContactTelephones').where('contactId', '=', contactId).get()).rows;
            return contactTelephone;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns a list of contactTelephones
    static async list(): Promise<IContactTelephone[]> {
        try {
            const contactTelephones: IContactTelephone[] = (await db.read.columns('*').tables('ContactTelephones').get()).rows;
            return contactTelephones;
        } catch(err) {
            throw new Error(err);
        }
    }

    // create a new contactTelephone 
    static async create(contactTelephone: IContactTelephone): Promise<{ message: string, result: boolean }> {
        try {
            const newContactTelephone: number = (await db.write.table('ContactTelephones').insert(contactTelephone).execute()).rowCount;
            return (newContactTelephone == 1) ? { message: 'Contact telephone created successfully', result : true } : { message: ' Failed to create contact telephone', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // update an existing contactTelephone 
    static async update(contactTelephone: IContactTelephone): Promise<{ message: string, result: boolean }> {
        try {
            const updatedContactTelephone: number = (await db.update.table('ContactTelephones').update(contactTelephone).where('telephoneId', '=', contactTelephone.telephoneId).execute()).rowCount;
            return (updatedContactTelephone == 1) ? { message: 'Contact telephone updated successfully', result : true } : { message: ' Failed to update contact telephone', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete a specific contactTelephone using its telephoneId
    static async delete(telephoneId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactTelephone: number = (await db.delete.table('ContactTelephones').where('telephoneId', '=', telephoneId).delete()).rowCount;
            return (contactTelephone == 1) ? { message: 'Contact telephone deleted successfully', result : true } : { message: 'Failed to delete contact telephone', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}