import { db } from "../database/db";
import { IContactTelephone } from "../interfaces/contact-telephone.interface";


export class ContactTelephone {
    // returns contactTelephone by telephone id
    static async get(telephoneId: number): Promise<IContactTelephone[]> {
        try {
            const contactTelephone: IContactTelephone[] = (await db.read.columns('*').tables('ContactTelephones').where('telephoneId', '=', telephoneId).get()).rows;
            return contactTelephone;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns list of all contactTelephone
    static async list(): Promise<IContactTelephone[]> {
        try {
            const contactTelephones: IContactTelephone[] = (await db.read.columns('*').tables('ContactTelephones').get()).rows;
            return contactTelephones;
        } catch(err) {
            throw new Error(err);
        }
    }

    // create new contactTelephone 
    static async create(contactTelephone: IContactTelephone): Promise<{ message: string }> {
        try {
            const newContactTelephone: number = (await db.write.table('ContactTelephones').insert(contactTelephone).execute()).rowCount;
            return (newContactTelephone == 1) ? { message: 'Contact telephone created successfully' } : { message: ' Failed to create contact telephone' };
        } catch(err) {
            throw new Error(err);
        }
    }

    // update contactTelephone 
    static async update(contactTelephone: IContactTelephone): Promise<{ message: string }> {
        try {
            const updatedContactTelephone: number = (await db.update.table('ContactTelephones').update(contactTelephone).where('telephoneId', '=', contactTelephone.telephoneId).execute()).rowCount;
            return (updatedContactTelephone == 1) ? { message: 'Contact telephone updated successfully' } : { message: ' Failed to update contact telephone' };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete contactTelephone by telephone id
    static async delete(telephoneId: number): Promise<{ message: string }> {
        try {
            const contactTelephone: number = (await db.delete.table('ContactTelephones').where('telephoneId', '=', telephoneId).delete()).rowCount;
            return (contactTelephone == 1) ? { message: 'Contact telephone deleted successfully' } : { message: 'Failed to delete contact telephone' };
        } catch(err) {
            throw new Error(err);
        }
    }
}