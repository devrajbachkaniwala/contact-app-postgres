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
exports.ContactTelephone = void 0;
const db_1 = require("../database/db");
class ContactTelephone {
    // returns contactTelephone by telephone id
    static get(telephoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactTelephone = (yield db_1.db.read.columns('*').tables('ContactTelephones').where('telephoneId', '=', telephoneId).get()).rows;
                return contactTelephone;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns list of all contactTelephone
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactTelephones = (yield db_1.db.read.columns('*').tables('ContactTelephones').get()).rows;
                return contactTelephones;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create new contactTelephone 
    static create(contactTelephone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactTelephone = (yield db_1.db.write.table('ContactTelephones').insert(contactTelephone).execute()).rowCount;
                return (newContactTelephone == 1) ? { message: 'Contact telephone created successfully' } : { message: ' Failed to create contact telephone' };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update contactTelephone 
    static update(contactTelephone) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContactTelephone = (yield db_1.db.update.table('ContactTelephones').update(contactTelephone).where('telephoneId', '=', contactTelephone.telephoneId).execute()).rowCount;
                return (updatedContactTelephone == 1) ? { message: 'Contact telephone updated successfully' } : { message: ' Failed to update contact telephone' };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // delete contactTelephone by telephone id
    static delete(telephoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactTelephone = (yield db_1.db.delete.table('ContactTelephones').where('telephoneId', '=', telephoneId).delete()).rowCount;
                return (contactTelephone == 1) ? { message: 'Contact telephone deleted successfully' } : { message: 'Failed to delete contact telephone' };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactTelephone = ContactTelephone;
//# sourceMappingURL=contact-telephone.class.js.map