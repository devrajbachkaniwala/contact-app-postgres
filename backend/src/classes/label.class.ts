import { db } from "../database/db";
import { ILabel } from "../interfaces/label.interface";

export default class Label {
    static async get(labelId: number): Promise<ILabel[]> {
        try {
            const label: ILabel[] = (await db.read.columns('*').tables('Labels').where('labelId', '=', labelId).get()).rows;
            return label;
        } catch(err) {
            throw err;
        }
    }

    static async list(): Promise<ILabel[]> {
        try {
            const labels: ILabel[] = (await db.read.columns('*').tables('Labels').get()).rows;
            return labels;
        } catch(err) {
            throw err;
        }
    }
    
    static async create(label: ILabel): Promise<{ message: string }> {
        try {
            const newLabel: number = (await db.write.table('Labels').insert(label).execute()).rowCount;
            return (newLabel == 1) ? { message : 'New label created successfully' } : { message : 'Failed to create label' };
        } catch(err) {
            throw err;
        }
    }
    
    static async update(label: ILabel): Promise<{ message: string }> {
        try {
            const updatedLabel: number = (await db.update.table('Labels').update(label).where('labelId', '=', label.labelId).execute()).rowCount;
            return (updatedLabel == 1) ? { message : 'Label updated successfully' } : { message : 'Failed to update label' };
        } catch(err) {
            throw err;
        }
    }
    
    static async delete(labelId: number): Promise<{ message: string }> {
        try {
            const label: number = (await db.delete.table('Labels').where('labelId', '=', labelId).delete()).rowCount;
            return (label == 0) ? { message: 'Label deleted' } : { message: 'Failed to delete label' };
        } catch(err) {
            throw err;
        }
    } 
}