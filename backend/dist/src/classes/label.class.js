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
class Label {
    static get(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.db.read.columns('*').tables('Labels').where('labelId', '=', labelId).get()).rows;
                return label;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.db.read.columns('*').tables('Labels').where('userId', '=', userId).get()).rows;
                return label;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const labels = (yield db_1.db.read.columns('*').tables('Labels').get()).rows;
                return labels;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newLabel = (yield db_1.db.write.table('Labels').insert(label).execute()).rowCount;
                return (newLabel == 1) ? { message: 'New label created successfully', result: true } : { message: 'Failed to create label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedLabel = (yield db_1.db.update.table('Labels').update(label).where('labelId', '=', label.labelId).execute()).rowCount;
                return (updatedLabel == 1) ? { message: 'Label updated successfully', result: true } : { message: 'Failed to update label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.db.delete.table('Labels').where('labelId', '=', labelId).delete()).rowCount;
                return (label == 0) ? { message: 'Label deleted successfully', result: true } : { message: 'Failed to delete label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Label;
//# sourceMappingURL=label.class.js.map