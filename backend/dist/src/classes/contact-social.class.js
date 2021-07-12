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
exports.ContactSocial = void 0;
const db_1 = require("../database/db");
class ContactSocial {
    // returns a specific contactSocial using its socialId
    static get(socialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactSocial = (yield db_1.db.read.columns('*').tables('ContactSocials').where('socialId', '=', socialId).get()).rows;
                return contactSocial;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a specific contactSocial using contactId
    static getByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactSocial = (yield db_1.db.read.columns('*').tables('ContactSocials').where('contactId', '=', contactId).get()).rows;
                return contactSocial;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a list of contactSocials
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactSocial = (yield db_1.db.read.columns('*').tables('ContactSocials').get()).rows;
                return contactSocial;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create a new contactSocial
    static create(contactSocial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactSocial = (yield db_1.db.write.table('ContactSocials').insert(contactSocial).execute()).rowCount;
                return (newContactSocial == 1) ? { message: 'Contact social added successfully', result: true } : { message: 'Failed to add contact social', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update an existing contactSocial
    static update(contactSocial) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContactSocial = (yield db_1.db.update.table('ContactSocials').update(contactSocial).where('socialId', '=', contactSocial.socialId).execute()).rowCount;
                return (updatedContactSocial == 1) ? { message: 'Contact social updated successfully', result: true } : { message: 'Failed to update contact social', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // delete a specific contactSocial using its socialId
    static delete(socialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactSocial = (yield db_1.db.delete.table('ContactSocials').where('socialId', '=', socialId).delete()).rowCount;
                return (contactSocial == 1) ? { message: 'Contact social deleted successfully', result: true } : { message: 'Failed to delete contact social', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactSocial = ContactSocial;
//# sourceMappingURL=contact-social.class.js.map