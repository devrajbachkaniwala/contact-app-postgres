import { db } from "../database/db";
import { IContactNote } from "../interfaces/contact-note.interface";

export class ContactNote {
    // returns a specific contactNote using its noteId
    static async get(noteId: number): Promise<IContactNote[]> {
        try {
            const contactNote: IContactNote[] = (await db.read.columns('*').tables('ContactNotes').where('noteId', '=', noteId).get()).rows;
            return contactNote;
        } catch(err) {
            throw new Error(err);
        }
    }
    
    // returns a specific contactNote using contactId
    static async getByContactId(contactId: number): Promise<IContactNote[]> {
        try {
            const contactNote: IContactNote[] = (await db.read.columns('*').tables('ContactNotes').where('contactId', '=', contactId).get()).rows;
            return contactNote;
        } catch(err) {
            throw new Error(err);
        }
    }

    // returns a list of contactNotes
    static async list(): Promise<IContactNote[]> {
        try {
            const contactNote: IContactNote[] = (await db.read.columns('*').tables('ContactNotes').get()).rows;
            return contactNote;
        } catch(err) {
            throw new Error(err);
        }
    }

    // create a new contactNote
    static async create(contactNote: IContactNote): Promise<{ message: string, result: boolean }> {
        try {
            const newContactNote: number = (await db.write.table('ContactNotes').insert(contactNote).execute()).rowCount;
            return ( newContactNote == 1 ) ? { message : 'Contact note created successfully', result : true } : { message : 'Failed to create contact note', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // update an existing contactNote
    static async update(contactNote: IContactNote): Promise<{ message: string, result: boolean }> {
        try {
            const updatedContactNote: number = (await db.update.table('ContactNotes').update(contactNote).where('noteId', '=', contactNote.noteId).execute()).rowCount;
            return ( updatedContactNote == 1 ) ? { message : 'Contact note updated successfully', result : true } : { message : 'Failed to update contact note', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }

    // delete a specific contactNote using its noteId
    static async delete(noteId: number): Promise<{ message: string, result: boolean }> {
        try {
            const contactNote: number = (await db.delete.table('ContactNotes').where('noteId', '=', noteId).delete()).rowCount;
            return ( contactNote == 1 ) ? { message : 'Contact note deleted successfully', result : true } : { message : 'Failed to delete contact note', result : false };
        } catch(err) {
            throw new Error(err);
        }
    }
}