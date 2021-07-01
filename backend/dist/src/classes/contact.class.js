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
const db_1 = require("../database/db");
class Contact {
    static get(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = (yield db_1.db.read.columns('*').tables('Contacts').where('userId', '=', userId).where('contactId', '=', contactId, false).get()).rows;
                return contact;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static list(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contacts = (yield db_1.db.read.columns('*').tables('Contacts').where('userId', '=', userId).get()).rows;
                return contacts;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = (yield db_1.db.write.table('Contacts').insert(contact).execute()).rowCount;
                return (newContact == 1) ? { message: 'New contact created successfully', result: true } : { message: 'Failed to create contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContact = (yield db_1.db.update.table('Contacts').update(contact).where('contactId', '=', contact.contactId).execute()).rowCount;
                return (updatedContact == 1) ? { message: 'Contact updated successfully', result: true } : { message: 'Failed to update contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = (yield db_1.db.delete.table('Contacts').where('contactId', '=', contactId).delete()).rowCount;
                return (contact == 0) ? { message: 'Contact deleted successfully', result: true } : { message: 'Failed to delete contact', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Contact;
//# sourceMappingURL=contact.class.js.map