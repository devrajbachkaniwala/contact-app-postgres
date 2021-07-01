"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contact_address_class_1 = require("../classes/contact-address.class");
const contact_email_address_class_1 = require("../classes/contact-email-address.class");
const contact_label_class_1 = __importDefault(require("../classes/contact-label.class"));
const contact_note_class_1 = require("../classes/contact-note.class");
const contact_social_class_1 = require("../classes/contact-social.class");
const contact_telephone_class_1 = require("../classes/contact-telephone.class");
const contact_website_class_1 = require("../classes/contact-website.class");
const contact_class_1 = __importDefault(require("../classes/contact.class"));
const label_class_1 = __importDefault(require("../classes/label.class"));
exports.router = express_1.Router();
/*
 *
 * Prefix of this route is /contacts
 *
*/
/*
 *
 * res.locals.user.subject has userId which is used to get the list of contacts of that user using userId
 *
 *
*/
exports.router.get('/', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const contact = yield contact_class_1.default.list(userId);
        const contacts = [];
        for (let c of contact) {
            const contactTelephones = yield contact_telephone_class_1.ContactTelephone.getByContactId(c.contactid);
            const contactLables = yield contact_label_class_1.default.getByContactID(c.contactid);
            let completeContact = {
                contact: c,
                contactTelephones,
                labels: []
            };
            for (let contactLabel of contactLables) {
                if (contactLabel.contactid == c.contactid) {
                    const labels = yield label_class_1.default.get(contactLabel.labelid);
                    completeContact['labels'] = labels;
                }
            }
            contacts.push(completeContact);
        }
        res.json(contacts);
    }
    catch (err) {
        console.log(err);
    }
}));
/*
 *
 * res.locals.user.subject has userId
 * req.params.contactId has contactId which is provided in route parameter
 * By using userId and contactId we can get a particular contact of a particular user
 *
 *
*/
exports.router.get('/:contactId', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const contactId = +req.params.contactId;
        const contact = yield contact_class_1.default.get(userId, contactId);
        const contactTelephones = yield contact_telephone_class_1.ContactTelephone.getByContactId(contactId);
        const contactAddresses = yield contact_address_class_1.ContactAddress.getByContactId(contactId);
        const contactSocials = yield contact_social_class_1.ContactSocial.getByContactId(contactId);
        const contactNotes = yield contact_note_class_1.ContactNote.getByContactId(contactId);
        const contactEmailAddresses = yield contact_email_address_class_1.ContactEmailAddress.getByContactId(contactId);
        const contactWebsites = yield contact_website_class_1.ContactWebsite.getByContactId(contactId);
        const contactLabels = yield contact_label_class_1.default.getByContactID(contactId);
        const labelId = contactLabels.map(item => item.labelid);
        const labels = [];
        for (let id of labelId) {
            labels.push((yield label_class_1.default.get(id)).pop());
        }
        const completeContact = {
            contact: contact.shift(),
            contactTelephones,
            contactAddresses,
            contactSocials,
            contactNotes,
            contactEmailAddresses,
            contactWebsites,
            labels
        };
        res.json(completeContact);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 *
 * post new contact
 *
 *
*/
exports.router.post('/', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = Object.assign({ userId: res.locals.user.subject }, req.body.contact);
        const newContact = {
            contact,
            contactTelephones: req.body.contactTelephones && [...req.body.contactTelephones],
            contactAddresses: req.body.contactAddresses && [...req.body.contactAddresses],
            contactSocials: req.body.contactSocials && [...req.body.contactSocials],
            conatctNotes: req.body.conatctNotes && [...req.body.conatctNotes],
            contactEmailAddresses: req.body.contactEmailAddresses && [...req.body.contactEmailAddresses],
            contactWebsites: req.body.contactWebsites && [...req.body.contactWebsites],
            contactLabels: req.body.contactSocials && [...req.body.contactLabels]
        };
        const contactResult = yield contact_class_1.default.create(newContact.contact);
        if (newContact.contactTelephones && newContact.contactTelephones.length) {
            newContact.contactTelephones.forEach((telephone) => __awaiter(void 0, void 0, void 0, function* () {
                const contactTelephone = yield contact_telephone_class_1.ContactTelephone.create(telephone);
                if (!contactTelephone.result) {
                    throw new Error(contactTelephone.message);
                }
            }));
        }
        if (newContact.contactAddresses && newContact.contactAddresses.length) {
            newContact.contactAddresses.forEach((address) => __awaiter(void 0, void 0, void 0, function* () {
                const contactAddress = yield contact_address_class_1.ContactAddress.create(address);
                if (!contactAddress.result) {
                    throw new Error(contactAddress.message);
                }
            }));
        }
        res.json(contactResult.message);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * verifyToken function verifies the token from the client and if it is correct then the decrypted result is assigned to res.locals.user and then next middleware is called
 * or if it is incorrect then invalid token is sent to the client or if token is null then unauthorizeed user it sent to the client
 *
*/
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        res.json({ message: 'Unauthorized user' });
        return;
    }
    jsonwebtoken_1.default.verify(token, 'secret key', (err, result) => {
        if (err) {
            res.json({ message: 'Invalid Token' });
            return;
        }
        res.locals.user = result;
        next();
    });
}
//# sourceMappingURL=contact.route.js.map