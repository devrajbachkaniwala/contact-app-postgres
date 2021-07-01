import { Router } from "express";
import User from "../classes/user.class";
import { ILoginUser } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';

export const loginRoute = Router();

/*
 * Prefix of this route is /login
*/

/*
 *
 * Before login:- email and password is checked in the database whether it is correct or not
 * If correct email and password is provided by the client then jwt token is created and sent to the client. jwt token includes subject property which has the value of loginUser's userId and this token is encrypted 
 * If incorrect email or password is provided by the client then incorrect email or password response is sent to the client
 * 
 * 
 * 
*/
loginRoute.post('/', async (req, res) => {
    try {
        const loginUser: ILoginUser = {
            ...req.body
        }

        const userEmail = await User.validateEmail(loginUser.email);
        const userPassword = await User.validatePassword(loginUser.password);
        
        if(!(userEmail.result && userEmail.result) || (userEmail.userId != userPassword.userId)) {
            res.json({ message: 'Incorrect email or password' });
            return;
        }

        const payload = {
            subject : ( userEmail.userId == userPassword.userId ) ? +userEmail.userId : null
        }
        
        const token = jwt.sign(payload, 'secret key');
        res.json({ token });
    } catch(err) {
       throw new Error(err);
    }
});