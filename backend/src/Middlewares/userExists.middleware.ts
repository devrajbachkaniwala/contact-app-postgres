import express from 'express';
import pool from '../Database/db';
import { IUserLogin } from '../Interfaces/User.interface';

export const userExists = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user: IUserLogin = req.body;

    pool.query('SELECT email FROM Users WHERE email = $1', [user.email], (err, result) => {
        if(err) {
            throw err;
        }
        if(result.rows.length == 0) {
            next();
        } else {
            return res.json({ message : 'Email already exists' })
        }
    })
}