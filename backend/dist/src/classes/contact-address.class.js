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
exports.ContactAddress = void 0;
const db_1 = require("../database/db");
class ContactAddress {
    // returns a specific contactAddress using its addressId
    static get(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactAddress = (yield db_1.db.read.columns('*').tables('ContactAddresses').where('addressId', '=', addressId).get()).rows;
                return contactAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a specific contactAddress using contactId
    static getByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactAddress = (yield db_1.db.read.columns('*').tables('ContactAddresses').where('contactId', '=', contactId).get()).rows;
                return contactAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a list of contactAddresses
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactAddress = (yield db_1.db.read.columns('*').tables('ContactAddresses').get()).rows;
                return contactAddress;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create a new contactAddress 
    static create(contactAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactAddress = (yield db_1.db.write.table('ContactAddresses').insert(contactAddress).execute()).rowCount;
                return (newContactAddress == 1) ? { message: 'New contact address created successfully', result: true } : { message: 'Failed to create contact address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update an existing contactAddress
    static update(contactAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContactAddress = (yield db_1.db.update.table('ContactAddresses').update(contactAddress).where('addressId', '=', contactAddress.contactId).execute()).rowCount;
                return (updatedContactAddress == 1) ? { message: 'Contact address updated successfully', result: true } : { message: 'Failed to update contact address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // delete a specific contactAddress using its addressId
    static delete(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactAddress = (yield db_1.db.delete.table('ContactAddresses').where('addressId', '=', addressId).delete()).rowCount;
                return (contactAddress == 1) ? { message: 'Contact address deleted successfully', result: true } : { message: 'Failed to delete contact address', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactAddress = ContactAddress;
//# sourceMappingURL=contact-address.class.js.map