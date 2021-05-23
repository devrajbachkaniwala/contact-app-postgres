import express from 'express';
import { App } from './App';
import { Contact } from './Class/Contact.class';
import { User } from './Class/User.class';
import { Login } from './Routes/Login.route';
import { Register } from './Routes/Register.route';

const PORT: number = (process.env.PORT as any) as number;
/* const app: express.Application = express();

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello from server');
})

//app.use('/user', User.get);
//app.use('/user/list', User.list);
//app.use('/user/create', User.create);
//app.use('/user/update', User.update);
//app.use('/user/delete', User.delete);

app.listen(PORT, () => console.log(`Server started at ${PORT}`)) */

const app = new App( [
    /* new User(), */
    new Register(),
    new Login(),
    new Contact()
], PORT);

app.listen();