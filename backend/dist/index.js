"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const ContactCompany_class_1 = __importDefault(require("./src/class/ContactCompany.class"));
dotenv_1.config();
const app = express_1.default();
const PORT = process.env.PORT;
app.use(cors_1.default('*'));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    /* const user: ICreateUser = {
        userId: 40,
        userName: 'DamonUpdated',
        email: 'damon@damonUpdate.com',
        password: 'damon123Update',
    } */
    //User.create(user).then(user => console.log(user), err => console.log(err));
    //User.list().then(user => console.log(user), err => console.log(err));
    //User.update(user).then(user => console.log(user), err => console.log(err));
    //User.delete(24).then(user => console.log(user), err => console.log(err));
    /* const contact: IContact = {
        companyId: 1,
        userId: 37,
        contactId: 20,
        firstName: 'Lexi',
        lastName: 'Rivera',
        dateOfBirth: new Date('2001-02-10'),
        modifiedAt: new Date()
    } */
    //Contact.create(36, contact).then( res => console.log(res), err => console.log(err));
    //Contact.list(37).then( res => console.log(res), err => console.log(err));
    //Contact.get(37, 20).then( res => console.log(res), err => console.log(err));
    //Contact.update(37, contact).then( res => console.log(res), err => console.log(err));
    //Contact.delete(37, 22).then( res => console.log(res), err => console.log(err));
    /* const label: ILabel = {
        userId: 36,
        labelId: 3,
        labelName: 'NEW UPDATED LABEL',
        modifiedAt: new Date()
    } */
    //Label.create(36, label).then( res => console.log(res), err => console.log(err));
    //Label.get(36).then( res => console.log(res), err => console.log(err));
    //Label.list().then( res => console.log(res), err => console.log(err));
    //Label.update(36, label).then( res => console.log(res), err => console.log(err));
    //Label.delete(36, 3).then( res => console.log(res), err => console.log(err));
    //ContactLabel.get(36, 1).then(res => console.log(res), err => console.log(err));
    //ContactLabel.list(36, 23).then(res => console.log(res), err => console.log(err));
    //ContactLabel.create(23, 2).then(res => console.log(res), err => console.log(err));
    //ContactLabel.delete(20, 1).then(res => console.log(res), err => console.log(err));
    ContactCompany_class_1.default.get(37, 20).then(res => console.log(res), err => console.log(err));
    res.send('Hello from server');
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
//# sourceMappingURL=index.js.map