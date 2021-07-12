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
exports.ContactNote = void 0;
const db_1 = require("../database/db");
class ContactNote {
    // returns a specific contactNote using its noteId
    static get(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactNote = (yield db_1.db.read.columns('*').tables('ContactNotes').where('noteId', '=', noteId).get()).rows;
                return contactNote;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a specific contactNote using contactId
    static getByContactId(contactId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactNote = (yield db_1.db.read.columns('*').tables('ContactNotes').where('contactId', '=', contactId).get()).rows;
                return contactNote;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // returns a list of contactNotes
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactNote = (yield db_1.db.read.columns('*').tables('ContactNotes').get()).rows;
                return contactNote;
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // create a new contactNote
    static create(contactNote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newContactNote = (yield db_1.db.write.table('ContactNotes').insert(contactNote).execute()).rowCount;
                return (newContactNote == 1) ? { message: 'Contact note created successfully', result: true } : { message: 'Failed to create contact note', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // update an existing contactNote
    static update(contactNote) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedContactNote = (yield db_1.db.update.table('ContactNotes').update(contactNote).where('noteId', '=', contactNote.noteId).execute()).rowCount;
                return (updatedContactNote == 1) ? { message: 'Contact note updated successfully', result: true } : { message: 'Failed to update contact note', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    // delete a specific contactNote using its noteId
    static delete(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contactNote = (yield db_1.db.delete.table('ContactNotes').where('noteId', '=', noteId).delete()).rowCount;
                return (contactNote == 1) ? { message: 'Contact note deleted successfully', result: true } : { message: 'Failed to delete contact note', result: false };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
}
exports.ContactNote = ContactNote;
//# sourceMappingURL=contact-note.class.js.map