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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactWebsite = void 0;
const db_1 = require("../database/db");
class ContactWebsite {
    // returns a specific contactWebsite using its websiteId
    static get(websiteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactWebsite = (yield db_1.db.read.columns('*').tables('ContactWebsites').where('websiteId', '=', websiteId).get()).rows;
                return contactWebsite;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a specific contactWebsite using contactId 
    static getByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactWebsite = (yield db_1.db.read.columns('*').tables('ContactWebsites').where('contactId', '=', contactId).get()).rows;
                return contactWebsite;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a list of contactWebsites
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactWebsite = (yield db_1.db.read.columns('*').tables('ContactWebsites').get()).rows;
                return contactWebsite;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create a new contactWebsite
    static create(contactWebsite) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactWebsite = (yield db_1.db.write.table('ContactWebsites').insert(contactWebsite).execute()).rowCount;
                return (newContactWebsite == 1) ? { message: 'Contact website added successfully', result: true } : { message: 'Failed to add contact website', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update an existing contactWebsite
    static update(contactWebsite) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateContactWebsite = (yield db_1.db.update.table('ContactWebsites').update(contactWebsite).where('websiteId', '=', contactWebsite.websiteId).execute()).rowCount;
                return (updateContactWebsite == 1) ? { message: 'Contact website updated successfully', result: true } : { message: 'Failed to update contact website', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // delete a specific contactWebsite using its websiteId
    static delete(websiteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactWebsite = (yield db_1.db.delete.table('ContactWebsites').where('websiteId', '=', websiteId).delete()).rowCount;
                return (contactWebsite == 1) ? { message: 'Contact website deleted successfully', result: true } : { message: 'Failed to delete contact website', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactWebsite = ContactWebsite;
//# sourceMappingURL=contact-website.class.js.map