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
class ContactLabel {
    //Get list of contactId of a particular labelId that belongs to a user
    static get(userId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.pool.query("SELECT ContactLabels.contactId, ContactLabels.labelId, Labels.labelName FROM ContactLabels, Contacts, Labels, Users WHERE ContactLabels.contactId = Contacts.contactId AND ContactLabels.labelId = Labels.labelId AND Users.userId = Contacts.userId AND Users.userId = $1 AND Labels.labelId = $2", [userId, labelId])).rows;
                return contactLabel;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Get list of labelId of a particular contactId that belongs to a user
    static list(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabels = (yield db_1.pool.query("SELECT ContactLabels.contactId, ContactLabels.labelId, Labels.labelName FROM ContactLabels, Contacts, Labels, Users WHERE ContactLabels.contactId = Contacts.contactId AND ContactLabels.labelId = Labels.labelId AND Users.userId = Contacts.userId AND Users.userId = $1 AND Contacts.contactId = $2", [userId, contactId])).rows;
                return contactLabels;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Assigns a label to a contact that belongs to a user
    static create(contactId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignContactLabel = (yield db_1.pool.query("INSERT INTO ContactLabels (contactId, labelId) VALUES ($1, $2) RETURNING contactId, labelId", [contactId, labelId])).rows;
                return assignContactLabel;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Remove a label from that contact that belongs to a user
    static delete(contactId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.pool.query("DELETE FROM ContactLabels WHERE contactId = $1 AND labelId = $2 ", [contactId, labelId])).rows;
                return (contactLabel.length == 0) ? { message: 'ContactLabel removed' } : { message: 'Failed to remove contactLabel' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = ContactLabel;
//# sourceMappingURL=contact-label.class.js.map