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
exports.RDBQuery = void 0;
const db_1 = require("../database/db");
class Contact {
    static get(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contact = (yield db_1.pool.query("SELECT companyId, Contacts.userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt FROM Users, Contacts WHERE Users.userId = Contacts.userId AND Contacts.userId = $1 AND Contacts.contactId = $2 ", [userId, contactId])).rows;
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
                const contacts = (yield db_1.pool.query("SELECT companyId, Contacts.userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt FROM Users, Contacts WHERE Users.userId = Contacts.userId AND Contacts.userId = $1 ORDER BY Contacts.firstName, Contacts.lastName", [userId])).rows;
                return contacts;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(userId, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContact = (yield db_1.pool.query("INSERT INTO Contacts (companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20 ) RETURNING companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, createdAt, modifiedAt", [contact.companyId, userId, contact.contactId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event])).rows;
                return newContact;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(userId, contact) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContact = (yield db_1.pool.query("UPDATE Contacts SET companyId = $1, contactPhoto = $2, prefix = $3, firstName = $4, middleName = $5, lastName = $6, suffix = $7, phoneticFirst = $8, phoneticMiddle = $9, phoneticLast = $10, nickname = $11, fileAs = $12, dateOfBirth = $13, relationship = $14, chat = $15, internetCall = $16, customField = $17, event = $18, modifiedAt = $19 WHERE Contacts.userId = $20 AND Contacts.contactId = $21 RETURNING companyId, userId, contactId, contactPhoto, prefix, firstName, middleName, lastName, suffix, phoneticFirst, phoneticMiddle, phoneticLast, nickname, fileAs, dateOfBirth, relationship, chat, internetCall, customField, event, Contacts.createdAt, Contacts.modifiedAt", [contact.companyId, contact.contactPhoto, contact.prefix, contact.firstName, contact.middleName, contact.lastName, contact.suffix, contact.phoneticFirst, contact.phoneticMiddle, contact.phoneticLast, contact.nickname, contact.fileAs, contact.dateOfBirth, contact.relationship, contact.chat, contact.internetCall, contact.customField, contact.event, contact.modifiedAt, userId, contact.contactId])).rows;
                return updatedContact;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = new RDBQuery();
                query.where('userId', '=', 1).where('userId', '=', 2, true);
                const contact = (yield db_1.pool.query("DELETE FROM Contacts WHERE Contacts.userId = $1 AND Contacts.contactId = $2", [userId, contactId])).rows;
                return (contact.length == 0) ? { message: 'Contact deleted' } : { message: 'Failed to delete contact' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Contact;
class RDBQuery {
    constructor() {
        this._action = 'SELECT';
        this._where = '';
        this._whereParams = [];
    }
    execute() {
        let query = this._action;
        return db_1.pool.query(query, []);
    }
    where(param, condition, value, isOR = false) {
        if (this._where.length > 0) {
            this._where += isOR ? ' OR ' : ' AND ';
        }
        this._whereParams.push(value);
        this._where += `${param} ${condition} $${this._whereParams.length}`;
        return this;
    }
}
exports.RDBQuery = RDBQuery;
//# sourceMappingURL=contact.class.js.map