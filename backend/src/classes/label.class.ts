import { db } from "../database/db";
import { ILabel } from "../interfaces/label.interface";

export default class Label {
    // returns a specific label using its labelId
    static async get(labelId: number): Promise<ILabel[]> {
        try {
            const label: ILabel[] = (await db.read.columns('*').tables('Labels').where('labelId', '=', labelId).get()).rows;
            return label;
        } catch(err) {
            throw err;
        }
    }
    
    // returns a specific label using userId
    static async getByUserId(userId: number): Promise<ILabel[]> {
        try {
            const label: ILabel[] = (await db.read.columns('*').tables('Labels').where('userId', '=', userId).get()).rows;
            return label;
        } catch(err) {
            throw err;
        }
    }

    // returns a list of labels
    static async list(): Promise<ILabel[]> {
        try {
            const labels: ILabel[] = (await db.read.columns('*').tables('Labels').get()).rows;
            return labels;
        } catch(err) {
            throw err;
        }
    }
    
    // create a new label
    static async create(label: ILabel): Promise<{ message: string, result: boolean }> {
        try {
            const newLabel: number = (await db.write.table('Labels').insert(label).execute()).rowCount;
            return (newLabel == 1) ? { message : 'New label created successfully', result : true } : { message : 'Failed to create label', result : false };
        } catch(err) {
            throw err;
        }
    }
    
    // update an existing label
    static async update(label: ILabel): Promise<{ message: string, result: boolean }> {
        try {
            const updatedLabel: number = (await db.update.table('Labels').update(label).where('labelId', '=', label.labelId).execute()).rowCount;
            return (updatedLabel == 1) ? { message : 'Label updated successfully', result : true } : { message : 'Failed to update label', result : false };
        } catch(err) {
            throw err;
        }
    }
    
    // delete a specific label using its labelId
    static async delete(labelId: number): Promise<{ message: string, result: boolean }> {
        try {
            const label: number = (await db.delete.table('Labels').where('labelId', '=', labelId).delete()).rowCount;
            return (label == 0) ? { message: 'Label deleted successfully', result : true } : { message: 'Failed to delete label', result : false };
        } catch(err) {
            throw err;
        }
    } 
}