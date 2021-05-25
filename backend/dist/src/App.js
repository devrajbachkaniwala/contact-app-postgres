/* import * as express from 'express';
import { IController } from './interfaces/controller.interface';

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers, port: number) {
        this.app = express();
        this.port = port;

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
        this.app.listen(this.port, () => console.log(`Server started at ${this.port}`));
    }
}

export default App; */ 
//# sourceMappingURL=App.js.map