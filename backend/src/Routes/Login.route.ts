import { Router } from "express";
import { User } from "../Class/User.class";

export class Login {
    public path: string = '/login';
    public router: Router = Router()

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.post(this.path, new User().get);
    }
}