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
    static getByContactID(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.db.read.columns('*').tables('ContactLabels').where('contactId', '=', contactId).get()).rows;
                return contactLabel;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getByLabelId(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.db.read.columns('*').tables('ContactLabels').where('labelId', '=', labelId).get()).rows;
                return contactLabel;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Get list of labelId of a particular contactId that belongs to a user
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabels = (yield db_1.db.read.columns('*').tables('ContactLabels').get()).rows;
                return contactLabels;
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Assigns a label to a contact that belongs to a user
    static create(contactLabel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const assignContactLabel = (yield db_1.db.write.table('ContactLabels').insert(contactLabel).execute()).rowCount;
                return (assignContactLabel == 1) ? { message: 'Contact label created successfully' } : { message: 'Failed to create Contact label' };
            }
            catch (err) {
                throw err;
            }
        });
    }
    //Remove a label from that contact that belongs to a user
    static deleteByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.db.delete.table('ContactLabels').where('contactId', '=', contactId).delete()).rowCount;
                return (contactLabel == 1) ? { message: 'Contact label removed successfully' } : { message: 'Failed to remove contact label' };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static deleteByLabelId(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactLabel = (yield db_1.db.delete.table('ContactLabels').where('labelId', '=', labelId).delete()).rowCount;
                return (contactLabel == 1) ? { message: 'Contact label removed successfully' } : { message: 'Failed to remove contact label' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = ContactLabel;
//# sourceMappingURL=contact-label.class.js.map