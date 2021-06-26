import { db } from "../database/db";
import { IContactLabel } from "../interfaces/contact-label.interface";

export default class ContactLabel {
    //Get list of contactId of a particular labelId that belongs to a user
    static async getByContactID(contactId: number): Promise<IContactLabel[]> {
        try {
            const contactLabel: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').where('contactId', '=', contactId).get()).rows;
            return contactLabel;
        } catch (err) {
            throw err;
        }
    }
    static async getByLabelId(labelId: number): Promise<IContactLabel[]> {
        try {
            const contactLabel: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').where('labelId', '=', labelId).get()).rows;
            return contactLabel;
        } catch (err) {
            throw err;
        }
    }


    //Get list of labelId of a particular contactId that belongs to a user
    static async list(): Promise<IContactLabel[]> {
        try {
            const contactLabels: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').get()).rows;
            return contactLabels;
        } catch (err) {
            throw err;
        }
    }

    //Assigns a label to a contact that belongs to a user
    static async create(contactLabel: IContactLabel): Promise<{ message: string }> {
        try {
            const assignContactLabel: number =  (await db.write.table('ContactLabels').insert(contactLabel).execute()).rowCount ;
            return (assignContactLabel == 1) ? { message : 'Contact label created successfully' } : { message : 'Failed to create Contact label' } ;
        } catch(err) {
            throw err;
        }
    }
    
    
    //Remove a label from that contact that belongs to a user
    static async deleteByContactId(contactId: number): Promise<{ message: string}> {
        try {
            const contactLabel: number = (await db.delete.table('ContactLabels').where('contactId', '=', contactId).delete()).rowCount;
            return (contactLabel == 1) ? { message: 'Contact label removed successfully'} : { message: 'Failed to remove contact label' };
        } catch(err) {
            throw err;
        }
    } 
    static async deleteByLabelId(labelId: number): Promise<{ message: string}> {
        try {
            const contactLabel: number = (await db.delete.table('ContactLabels').where('labelId', '=', labelId).delete()).rowCount;
            return (contactLabel == 1) ? { message: 'Contact label removed successfully'} : { message: 'Failed to remove contact label' };
        } catch(err) {
            throw err;
        }
    } 
}