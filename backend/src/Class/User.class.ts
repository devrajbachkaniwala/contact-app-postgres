import { IUser, IUserLogin } from "../Interfaces/User.interface";
import pool from '../Database/db';
import express from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from "../Interfaces/Payload.interface";

export class User {
    path = '/users';
    router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(`${this.path}`, this.list);
        this.router.get(`${this.path}/:userId`, this.get);
        this.router.post(`${this.path}`, this.create);
        this.router.put(`${this.path}/:userId`, this.update);
        this.router.delete(`${this.path}/:userId`, this.delete);
    }

     get(req: express.Request, res: express.Response): void {
        //const userId: number = +req.params.userId;
        const email: string = req.body.email;
        const password: string = req.body.password;
        pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto FROM Users WHERE email = $1 and password= $2", [email, password], (err, result) => {
            if(err) {
               throw err;
            }
            if(result.rows.length < 1) return res.json({ message : 'Email or Password incorrect' });
            const payload: IPayload = {
                subject: result.rows[0].userid
            }
            const token = jwt.sign(payload, 'secretKey');
            res.json({token});
        })
    }

     list(req: express.Request, res: express.Response): void {
        pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto FROM Users", (err, result) => {
           if(err) {
               throw err;
           }
            res.json(result.rows);
        })
    }
    
     create(req: express.Request, res: express.Response): void {
        const user: IUserLogin = req.body;

        pool.query("INSERT INTO Users(username, email, password, userPhoto) VALUES ($1, $2, $3, $4) RETURNING userId", [user.username, user.email, user.password, user.userPhoto], (err, result) => {
            if(err) {
               throw err;
            }
            const payload: IPayload = {
               subject : result.rows[0].userid
            }
            const token = jwt.sign(payload, 'secretKey');
            res.json({token});
        })
    }

     update(req: express.Request, res: express.Response): void {
        const user: IUserLogin = req.body;
        const userId: number = +req.params.userId;
        pool.query("UPDATE Users SET username = $1, email = $2, password = $3, userPhoto = $4, modifiedAt = $5 WHERE userId = $6", [user.username, user.email, user.password, user.userPhoto, user.modifiedAt, userId], (err, result) => {
           if(err) {
               throw err;
           }
            res.json({ message : 'Success'});
        })
    }
    
     delete(req: express.Request, res: express.Response): void {
        const userId: number = +req.params.userId;
        pool.query("DELETE FROM Users WHERE userId = $1", [userId], (err, result) => {
           if(err) {
               throw err;
           }
            res.json({ message : 'Success'});
        })
    }
}