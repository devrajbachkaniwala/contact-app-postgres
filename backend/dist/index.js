"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const contact_note_class_1 = require("./src/classes/contact-note.class");
dotenv_1.config();
const app = express_1.default();
const PORT = process.env.PORT;
app.use(cors_1.default('*'));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    const contactLabel = {
        contactId: 2,
        labelId: 3
    };
    const contact = {
        userId: 44,
        contactId: 2,
        firstName: 'Test Contact 22'
    };
    const contactTelephone = {
        contactId: 2,
        telephoneId: 2,
        countryCode: '+91',
        number: 333333
    };
    const contactAddress = {
        contactId: 2,
        addressId: 2,
        streetAddress: 'update street 2'
    };
    const contactSocial = {
        contactId: 2,
        socialId: 3,
        whatsapp: 'updatetest3'
    };
    const contactNote = {
        contactId: 2,
        noteId: 3,
        content: 'UPDATE 3'
    };
    contact_note_class_1.ContactNote.list().then(result => {
        res.json(result);
    });
});
app.listen(PORT, () => console.log(`Server started at ${PORT}`));
//# sourceMappingURL=index.js.map