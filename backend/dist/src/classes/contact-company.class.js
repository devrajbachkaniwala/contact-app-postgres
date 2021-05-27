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
class ContactCompany {
    //Get company of a contact that belongs to a user;
    static get(userId, contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactCompany = (yield db_1.pool.query("SELECT Contacts.contactId, ContactCompanies.companyId, company, jobTitle, department, ContactCompanies.createdAt, ContactCompanies.modifiedAt FROM Contacts, ContactCompanies, Users WHERE Users.userId = Contacts.userId AND Contacts.companyId = ContactCompanies.companyId AND Users.userId = $1 AND Contacts.contactId = $2", [userId, contactId])).rows;
                return contactCompany;
            }
            catch (err) {
            }
        });
    }
    //Get contact of a company that belongs to a user;
    static list(userId, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactCompany = (yield db_1.pool.query("SELECT Contacts.contactId, ContactCompanies.companyId, company, jobTitle, department, ContactCompanies.createdAt, ContactCompanies.modifiedAt FROM Contacts, ContactCompanies, Users WHERE Users.userId = Contacts.userId AND Contacts.companyId = ContactCompanies.companyId AND Users.userId = $1 AND ContactCompanies.companyId = $2", [userId, companyId])).rows;
                return contactCompany;
            }
            catch (err) {
            }
        });
    }
    //Create contact of a company that belongs to a user;
    static create(userId, contactId, contactCompany) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactCompany = (yield db_1.pool.query("INSERT INTO ContactCompanies (companyId, company, jobTitle, department) VALUES ($1, $2, $3, $4) RETURNING companyId, company, jobTitle, department, createdAt, modifiedAt", [contactCompany.companyId, contactCompany.company, contactCompany.jobTitle, contactCompany.department])).rows;
                const updateContact = (yield db_1.pool.query("UPDATE Contacts SET companyId = $1 WHERE userId = $2 AND contactId = $3", [contactCompany.companyId, userId, contactId])).rows;
                return { newContactCompany, updateContact };
            }
            catch (err) {
            }
        });
    }
}
exports.default = ContactCompany;
//# sourceMappingURL=contact-company.class.js.map