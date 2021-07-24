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
exports.LabelModel = void 0;
const db_1 = require("../database/db");
class Label {
    // returns a specific label of a particular user using its labelId and userId
    static get(userId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.db.read.columns('*').tables('Labels').where('userId', '=', userId).where('labelId', '=', labelId).get()).rows;
                return label;
            }
            catch (err) {
                throw err;
            }
        });
    }
    // returns a specific label using userId
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
    // returns a list of labels
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
    // create a new label
    static create(label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const newLabel: number = (await db.write.table('Labels').insert(label).execute()).rowCount;
                const newLabel = (yield db_1.pool.query('INSERT INTO Labels(userId, labelId, labelName) VALUES ($1, $2, $3)', [label.userId, label.labelId, label.labelName])).rowCount;
                return (newLabel == 1) ? { message: 'New label created successfully', result: true } : { message: 'Failed to create label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    // update an existing label
    static update(userId, labelId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //const updatedLabel: number = (await db.update.table('Labels').update(label).where('labelId', '=', label.labelId).execute()).rowCount;
                const updatedLabel = (yield db_1.pool.query('UPDATE Labels SET labelName = $1, modifiedAt = $2 WHERE userId = $3 AND labelId = $4', [label.labelName, label.modifiedAt, userId, labelId])).rowCount;
                return (updatedLabel == 1) ? { message: 'Label updated successfully', result: true } : { message: 'Failed to update label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
    // delete a specific label using its labelId
    static delete(userId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.db.delete.table('Labels').where('userId', '=', userId).where('labelId', '=', labelId).delete()).rowCount;
                return (label == 1) ? { message: 'Label deleted successfully', result: true } : { message: 'Failed to delete label', result: false };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Label;
class LabelModel {
    constructor(userId, labelId, labelName, createdAt, modifiedAt) {
        this.userId = userId;
        this.labelId = labelId;
        this.labelName = labelName;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}
exports.LabelModel = LabelModel;
//# sourceMappingURL=label.class.js.map