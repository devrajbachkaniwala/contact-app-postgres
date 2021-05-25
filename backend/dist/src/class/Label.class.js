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
    static get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.pool.query("SELECT Labels.userId, labelId, labelName, createdAt, modifiedAt FROM Labels WHERE Labels.userId = $1", [userId])).rows;
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
                const labels = (yield db_1.pool.query("SELECT Labels.userId, labelId, labelName, createdAt, modifiedAt FROM Labels")).rows;
                return labels;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(userId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const labels = (yield db_1.pool.query("INSERT INTO Labels (userId, labelId, labelName) VALUES ($1, $2, $3) RETURNING userId, labelId, labelName, createdAt, modifiedAt", [userId, label.labelId, label.labelName])).rows;
                return labels;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(userId, label) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedLabel = (yield db_1.pool.query("UPDATE Labels SET labelName = $1, modifiedAt = $2 WHERE userId = $3 AND labelId = $4 RETURNING userId, labelId, LabelName, createdAt, modifiedAt", [label.labelName, label.modifiedAt, userId, label.labelId])).rows;
                return updatedLabel;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(userId, labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const label = (yield db_1.pool.query("DELETE FROM Labels WHERE userId = $1 AND labelId = $2", [userId, labelId])).rows;
                return (label.length == 0) ? { message: 'Label deleted' } : { message: 'Failed to delete label' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = Label;
//# sourceMappingURL=Label.class.js.map