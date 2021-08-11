"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.verifyToken = exports.router = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contact_class_1 = __importStar(require("../classes/contact.class"));
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
        const contacts = yield contact_class_1.default.listContacts(userId);
        res.json(contacts);
    }
    catch (err) {
        throw new Error(err);
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
        const contact = yield contact_class_1.default.getContact(userId, contactId);
        res.json(contact);
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
        const contact = req.body.contact;
        const newContact = contactConstructor(contact);
        const result = yield contact_class_1.default.createContact(newContact);
        res.json(result);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * contactConstructor function takes contact and strictly makes contact object through its appropriately models
 *
 *
*/
function contactConstructor(contact, isUpdating) {
    var _a, _b, _c, _d, _e, _f, _g;
    const newContact = new contact_class_1.ContactModel(contact.userId, contact.contactId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event, contact.company, contact.jobTitle, contact.department);
    (isUpdating) ? newContact.modifiedat = new Date() : '';
    let contactTelephones = [];
    let contactAddresses = [];
    let contactEmailAddresses = [];
    let contactNotes = [];
    let contactSocials = [];
    let contactWebsites = [];
    let contactLabels = [];
    let total = (_a = contact.telephones) === null || _a === void 0 ? void 0 : _a.length;
    for (let i = 0; i < total; i++) {
        const telephones = contact.telephones[i];
        const telephone = new contact_class_1.ContactTelephoneModel(telephones.contactId, telephones.telephoneId, telephones.countryCode, telephones.number);
        switch (isUpdating) {
            case true:
                telephone.modifiedat = new Date();
                break;
        }
        contactTelephones.push(telephone);
    }
    total = (_b = contact.addresses) === null || _b === void 0 ? void 0 : _b.length;
    for (let i = 0; i < total; i++) {
        const addresses = contact.addresses[i];
        const address = new contact_class_1.ContactAddressModel(addresses.contactId, addresses.addressId, addresses.country, addresses.state, addresses.city, addresses.streetAddress, addresses.streetAddressLine2, addresses.pincode, addresses.poBox, addresses.type);
        (isUpdating) ? address.modifiedat = new Date() : '';
        contactAddresses.push(address);
    }
    total = (_c = contact.emailAddresses) === null || _c === void 0 ? void 0 : _c.length;
    for (let i = 0; i < total; i++) {
        const emailAddresses = contact.emailAddresses[i];
        const emailAddress = new contact_class_1.ContactEmailAddressModel(emailAddresses.contactId, emailAddresses.emailAddressId, emailAddresses.email);
        (isUpdating) ? emailAddress.modifiedat = new Date() : '';
        contactEmailAddresses.push(emailAddress);
    }
    total = (_d = contact.notes) === null || _d === void 0 ? void 0 : _d.length;
    for (let i = 0; i < total; i++) {
        const notes = contact.notes[i];
        const note = new contact_class_1.ContactNoteModel(notes.contactId, notes.noteId, notes.content);
        (isUpdating) ? note.modifiedat = new Date() : '';
        contactNotes.push(note);
    }
    total = (_e = contact.socials) === null || _e === void 0 ? void 0 : _e.length;
    for (let i = 0; i < total; i++) {
        const socials = contact.socials[i];
        const social = new contact_class_1.ContactSocialModel(socials.contactId, socials.socialId, socials.whatsapp, socials.facebook, socials.twitter, socials.snapchat);
        contactSocials.push(social);
    }
    total = (_f = contact.websites) === null || _f === void 0 ? void 0 : _f.length;
    for (let i = 0; i < total; i++) {
        const websites = contact.websites[i];
        const website = new contact_class_1.ContactWebsiteModel(websites.contactId, websites.websiteId, websites.websiteName);
        (isUpdating) ? website.modifiedat = new Date() : '';
        contactWebsites.push(website);
    }
    total = (_g = contact.labels) === null || _g === void 0 ? void 0 : _g.length;
    for (let i = 0; i < total; i++) {
        const labels = contact.labels[i];
        const contactLabel = new contact_class_1.ContactLabelModel(labels.contactId, labels.labelId);
        contactLabels.push(contactLabel);
    }
    return {
        newContact,
        contactTelephones,
        contactAddresses,
        contactEmailAddresses,
        contactNotes,
        contactSocials,
        contactWebsites,
        contactLabels
    };
}
/*
 *
 * Update an existing contact
 *
 *
*/
exports.router.put('/:contactId', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactId = +req.params.contactId;
        const userId = res.locals.user.subject;
        const contact = req.body.contact;
        const updatedContact = contactConstructor(contact, true);
        const result = yield contact_class_1.default.updateContact(userId, contactId, updatedContact);
        res.json(result);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * Delete a specific contact using contactId
 *
 *
*/
exports.router.delete('/:contactId', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const contactId = +req.params.contactId;
        const result = yield contact_class_1.default.delete(userId, contactId);
        res.json(result);
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
exports.verifyToken = verifyToken;
//# sourceMappingURL=contact.route.js.map