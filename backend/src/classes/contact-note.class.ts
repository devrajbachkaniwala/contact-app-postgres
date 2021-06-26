import { db } from "../database/db";
import { IContactNote } from "../interfaces/contact-note.interface";

export class ContactNote {
    static async get(noteId: number): Promise<IContactNote[]> {
        try {
            const contactNote: IContactNote[] = (await db.read.columns('*').tables('ContactNotes').where('noteId', '=', noteId).get()).rows;
            return contactNote;
        } catch(err) {
            throw new Error(err);
        }
    }

    static async list(): Promise<IContactNote[]> {
        try {
            const contactNote: IContactNote[] = (await db.read.columns('*').tables('ContactNotes').get()).rows;
            return contactNote;
        } catch(err) {
            throw new Error(err);
        }
    }
    static async create(contactNote: IContactNote): Promise<{ message: string }> {
        try {
            const newContactNote: number = (await db.write.table('ContactNotes').insert(contactNote).execute()).rowCount;
            return ( newContactNote == 1 ) ? { message : 'Contact note created successfully' } : { message : 'Failed to create contact note' };
        } catch(err) {
            throw new Error(err);
        }
    }
    static async update(contactNote: IContactNote): Promise<{ message: string }> {
        try {
            const updatedContactNote: number = (await db.update.table('ContactNotes').update(contactNote).where('noteId', '=', contactNote.noteId).execute()).rowCount;
            return ( updatedContactNote == 1 ) ? { message : 'Contact note updated successfully' } : { message : 'Failed to update contact note' };
        } catch(err) {
            throw new Error(err);
        }
    }
    static async delete(noteId: number): Promise<{ message: string }> {
        try {
            const contactNote: number = (await db.delete.table('ContactNotes').where('noteId', '=', noteId).delete()).rowCount;
            return ( contactNote == 1 ) ? { message : 'Contact note deleted successfully' } : { message : 'Failed to delete contact note' };
        } catch(err) {
            throw new Error(err);
        }
    }
}