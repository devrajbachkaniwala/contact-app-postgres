import { Router } from "express";
import User from "../classes/user.class";
import { ICreateUser, IUpdateUser, IUser } from "../interfaces/user.interface";
import jwt from 'jsonwebtoken';

export const router = Router();

//router.use('', contact);

// prefix /users

//get all users
router.get('/', async (req, res) => {
    try {
        const users: IUser[] = await User.list(); 
        res.json(users);
    } catch(err) {
        throw new Error(err);
    }
});

//get 1 user
router.get('/:userId', async (req, res) => {
    try {
        const userId: number = +req.params.userId;
        const user: IUser[] = await User.get(userId);

        if(user.length == 0) {
            res.json({ message: 'User does not exist' });
            return;
        }
        const payload = {
            subject : userId
        }

        const token = jwt.sign(payload, 'secret key');
        res.json({ token });
    } catch(err) {
        throw new Error(err);
    }
})

//post 1 user
router.post('/', async (req, res) => {
    try {
        const user: ICreateUser = {
            ...req.body
        }

        const newUser: { message: string, result: boolean } = await User.create(user);

        if(!newUser.result) {
            res.json(newUser.message);
            return;
        }
        const payload = { 
            subject: user.userId
        };
        const token = jwt.sign(payload, 'secret key');
        res.json({ token });
    } catch(err) {
        throw new Error(err);
    }
})

//update 1 user
router.put('/', async (req, res) => {
    try {
        const user: IUpdateUser = {
            ...req.body
        }

        const updatedUser: { message: string, result: boolean } = await User.update(user);

        if(!updatedUser.result) {
            res.json(updatedUser.message);
            return;
        }
        res.json(updatedUser.message);
    } catch(err) {
        throw new Error(err);
    }
})

//delete 1 user
router.delete('/:userId', async (req, res) => {
    try {
        const userId: number = +req.params.userId;

        const deletedUser: { message: string, result: boolean } = await User.delete(userId);

        if(!deletedUser.result) {
            res.json(deletedUser.message);
            return;
        }
        res.json(deletedUser.message);
    } catch(err) {
        throw new Error(err);
    }

})


