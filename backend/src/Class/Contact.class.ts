import { Router } from "express";
import { authValidator } from '../Middlewares/authValidator.middleware';

export class Contact {
    public path: string = '/contact';
    public router: Router = Router();

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get(this.path, authValidator, (req, res) => {
            res.send('You are logged in');
        })
    }
}