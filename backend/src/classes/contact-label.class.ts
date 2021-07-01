import { db } from "../database/db";
import { IContactLabel } from "../interfaces/contact-label.interface";

export default class ContactLabel {
    // returns a list of contactLabel of a particular contactId 
    static async getByContactID(contactId: number): Promise<IContactLabel[]> {
        try {
            const contactLabel: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').where('contactId', '=', contactId).get()).rows;
            return contactLabel;
        } catch (err) {
            throw err;
        }
    }

    // returns a list of contactLabel of a particular labelId
    static async getByLabelId(labelId: number): Promise<IContactLabel[]> {
        try {
            const contactLabel: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').where('labelId', '=', labelId).get()).rows;
            return contactLabel;
        } catch (err) {
            throw err;
        }
    }


    // returns a list of contactLabel
    static async list(): Promise<IContactLabel[]> {
        try {
            const contactLabels: IContactLabel[] = (await db.read.columns('*').tables('ContactLabels').get()).rows;
            return contactLabels;
        } catch (err) {
            throw err;
        }
    }

    // assign label to a contact 
    static async create(contactLabel: IContactLabel): Promise<{ message: string, result: boolean }> {
        try {
            const assignContactLabel: number =  (await db.write.table('ContactLabels').insert(contactLabel).execute()).rowCount ;
            return (assignContactLabel == 1) ? { message : 'Contact label created successfully', result : true } : { message : 'Failed to create Contact label', result : false } ;
        } catch(err) {
            throw err;
        }
    }
    
    
    // remove label from a contact using contactId
    static async deleteByContactId(contactId: number): Promise<{ message: string, result: boolean}> {
        try {
            const contactLabel: number = (await db.delete.table('ContactLabels').where('contactId', '=', contactId).delete()).rowCount;
            return (contactLabel == 1) ? { message: 'Contact label removed successfully', result : true} : { message: 'Failed to remove contact label', result : false };
        } catch(err) {
            throw err;
        }
    } 

    // remove label from a contact using its labelId
    static async deleteByLabelId(labelId: number): Promise<{ message: string, result: boolean}> {
        try {
            const contactLabel: number = (await db.delete.table('ContactLabels').where('labelId', '=', labelId).delete()).rowCount;
            return (contactLabel == 1) ? { message: 'Contact label removed successfully', result : true} : { message: 'Failed to remove contact label', result : false };
        } catch(err) {
            throw err;
        }
    } 
}