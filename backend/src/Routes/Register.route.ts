import { Router } from "express";
import { User } from "../Class/User.class";
import { userExists } from '../Middlewares/userExists.middleware';

export class Register {
    public path: string = '/register';
    public router: Router = Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(this.path, userExists, new User().create);
    }
}