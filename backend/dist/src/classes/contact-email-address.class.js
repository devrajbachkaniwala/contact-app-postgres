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
exports.ContactEmailAddress = void 0;
const db_1 = require("../database/db");
class ContactEmailAddress {
    static get(emailAddressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactEmailAddress = (yield db_1.db.read.columns('*').tables('ContactEmailAddresses').where('emailAddressId', '=', emailAddressId).get()).rows;
                return contactEmailAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static getByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactEmailAddress = (yield db_1.db.read.columns('*').tables('ContactEmailAddresses').where('contactId', '=', contactId).get()).rows;
                return contactEmailAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactEmailAddress = (yield db_1.db.read.columns('*').tables('ContactEmailAddresses').get()).rows;
                return contactEmailAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static create(contactEmailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactEmailAddress = (yield db_1.db.write.table('ContactEmailAddresses').insert(contactEmailAddress).execute()).rowCount;
                return (newContactEmailAddress == 1) ? { message: 'Contact email address created successfully', result: true } : { message: 'Failed to create contact email address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static update(contactEmailAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateContactEmailAddress = (yield db_1.db.update.table('ContactEmailAddresses').update(contactEmailAddress).where('emailAddressId', '=', contactEmailAddress.emailAddressId).execute()).rowCount;
                return (updateContactEmailAddress == 1) ? { message: 'Contact email address updated successfully', result: true } : { message: 'Failed to update contact email address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    static delete(emailAddressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactEmailAddress = (yield db_1.db.delete.table('ContactEmailAddresses').where('emailAddressId', '=', emailAddressId).delete()).rowCount;
                return (contactEmailAddress == 1) ? { message: 'Contact email address deleted successfully', result: true } : { message: 'Failed to delete contact email address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactEmailAddress = ContactEmailAddress;
//# sourceMappingURL=contact-email-address.class.js.map