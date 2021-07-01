"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const register_route_1 = require("./src/routes/register.route");
const login_route_1 = require("./src/routes/login.route");
const contact_route_1 = require("./src/routes/contact.route");
dotenv_1.config();
const app = express_1.default();
const PORT = process.env.PORT;
app.use(cors_1.default('*'));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use('/register', register_route_1.registerRoute);
app.use('/login', login_route_1.loginRoute);
app.use('/contacts', contact_route_1.router);
app.get('/', (req, res) => {
    /* const contactLabel: IContactLabel = {
        contactId: 2,
        labelId:  3
    }

    const contact: IContact = {
        userId: 44,
        contactId: 2,
        firstName: 'Test Contact 22'
    }

    const contactTelephone: IContactTelephone = {
        contactId: 2,
        telephoneId: 2,
        countryCode: '+91',
        number: 333333
    }
    
    const contactAddress: IContactAddress = {
        contactId: 2,
        addressId: 2,
        streetAddress: 'update street 2'
    }

    const contactSocial: IContactSocial = {
        contactId: 2,
        socialId: 3,
        whatsapp: 'updatetest3'
    }

    const contactNote: IContactNote = {
        contactId: 2,
        noteId: 3,
        content: 'UPDATE 3'
    }

    const contactEmailAddress: IContactEmailAddress = {
        contactId: 2,
        emailAddressId: 3,
        email: 'update3@test33'
    }

    const contactWebsite: IContactWebsite = {
        contactId: 2,
        websiteId: 3,
        websiteName: 'UPDATE  33333'
    }

    ContactWebsite.list().then( result => {
        res.json(result);
    }) */
    res.send('Hello from server');
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
//# sourceMappingURL=index.js.map