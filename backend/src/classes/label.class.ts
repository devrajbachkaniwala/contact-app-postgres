import { pool } from "../database/db";
import { ILabel } from "../interfaces/Label.interface";

export default class Label {
    static async get(userId: number): Promise<ILabel[]> {
        try {
            const label: ILabel[] = (await pool.query("SELECT Labels.userId, labelId, labelName, createdAt, modifiedAt FROM Labels WHERE Labels.userId = $1", [ userId ])).rows;
            return label;
        } catch(err) {
            throw err;
        }
    }
    
    static async list(): Promise<ILabel[]> {
        try {
            const labels: ILabel[] = (await pool.query("SELECT Labels.userId, labelId, labelName, createdAt, modifiedAt FROM Labels")).rows;
            return labels;
        } catch(err) {
            throw err;
        }
    }
    
    static async create(userId: number, label: ILabel): Promise<ILabel[]> {
        try {
            const labels: ILabel[] = (await pool.query("INSERT INTO Labels (userId, labelId, labelName) VALUES ($1, $2, $3) RETURNING userId, labelId, labelName, createdAt, modifiedAt", [userId, label.labelId, label.labelName])).rows;
            return labels;
        } catch(err) {
            throw err;
        }
    }

    static async update(userId: number, label: ILabel): Promise<ILabel[]> {
        try {
            const updatedLabel: ILabel[] = (await pool.query("UPDATE Labels SET labelName = $1, modifiedAt = $2 WHERE userId = $3 AND labelId = $4 RETURNING userId, labelId, LabelName, createdAt, modifiedAt", [ label.labelName, label.modifiedAt, userId, label.labelId ])).rows;
            return updatedLabel;
        } catch(err) {
            throw err;
        }
    }

    static async delete(userId: number, labelId: number): Promise<{ message: string }> {
        try {
            const label = (await pool.query("DELETE FROM Labels WHERE userId = $1 AND labelId = $2", [ userId, labelId ])).rows;
            return (label.length == 0) ? { message: 'Label deleted' } : { message: 'Failed to delete label' };
        } catch(err) {
            throw err;
        }
    }
}