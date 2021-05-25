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
class User {
    static get(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield db_1.pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive , createdAt, modifiedAt FROM Users WHERE userId = $1", [userId])).rows;
                return user;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = (yield db_1.pool.query("SELECT userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt FROM Users")).rows;
                return users;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUserId = (yield db_1.pool.query("INSERT INTO Users (username, email, password, userPhoto, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt", [user.userName, user.email, user.password, user.userPhoto, user.isActive])).rows;
                return newUserId;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = (yield db_1.pool.query("UPDATE Users SET userName = $1, email = $2, password = $3, userPhoto = $4, isActive = $5, modifiedAt = $6 WHERE userId = $7 RETURNING userId, username, email, encode(userPhoto, 'escape') as userPhoto, isActive, createdAt, modifiedAt", [user.userName, user.email, user.password, user.userPhoto, user.isActive, user.modifiedAt, user.userId])).rows;
                return updatedUser;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield db_1.pool.query("DELETE FROM Users WHERE userId = $1", [userId])).rows;
                return (user.length == 0) ? { message: 'User deleted' } : { message: 'Failed to delete user' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.class.js.map