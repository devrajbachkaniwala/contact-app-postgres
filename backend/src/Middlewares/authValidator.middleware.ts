import express from 'express';
import jwt from 'jsonwebtoken';
import { IPayload } from '../Interfaces/Payload.interface';

export const authValidator = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authorization = req.headers['authorization'];
    const token = authorization?.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, 'secretKey', (err, user) => {
        if(err) return res.sendStatus(403);
        
        res.locals.userID = user; 
        next();
    })

}