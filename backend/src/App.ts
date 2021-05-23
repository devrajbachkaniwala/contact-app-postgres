import express from 'express';
import { IController } from './Interfaces/Controller.interface';

export class App {
    private app: express.Application;
    private PORT: number;

    constructor(controllers: IController[], port: number) {
        this.app = express();
        this.PORT = port

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(express.json());
    }

    private initializeControllers(controllers: IController[]) {
        controllers.forEach( controller => {
            this.app.use('/', controller.router);
        })
    }

    public listen() {
        this.app.listen(this.PORT, () => console.log(`Server Started at ${this.PORT}`));
    }
}