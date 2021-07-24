import { Router } from "express";
import User from "../classes/user.class";
import { ICreateUser } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';

export const registerRoute = Router();

/*
 *
 * Prefix of this route is /register 
 *
*/

/*
 *
 * Before creating the new user:- email is checked whether it is present in the database or not
 * if email is present then email already exists response is sent to the client 
 * if email is not present then new user is created using the given credentials from the client and is stored in the database
 * and jwt token is created and sent to the client. jwt token includes subject property which has value of new user's userId and this token is encrypyted
 * 
 *
*/
registerRoute.post('/', async (req, res) => {
    try {
        const user: ICreateUser = {
            ...req.body
        }

        const isExist: { message: string, result: boolean, userId: number } = await User.validateEmail(user.email);

        if (isExist.result) {
            res.json({ message: 'Email already exists' });
            return;
        }

        const newUser: { message: string, result: boolean } = await User.create(user);

        if (!newUser.result) {
            res.json(newUser.message);
            return;
        }

        const payload = {
            subject: user.userId
        };
        
        const token: string = jwt.sign(payload, 'secret key');
        res.json({ token });
    } catch (err) {
        throw new Error(err);
    }
});

