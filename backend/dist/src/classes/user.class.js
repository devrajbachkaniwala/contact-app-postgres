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
                const user = (yield db_1.db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').where('userId', '=', userId).get()).rows;
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
                const users = (yield db_1.db.read.columns(['userid', 'username', 'email', 'userphoto', 'createdat', 'modifiedat', 'isactive']).tables('Users').get()).rows;
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
                const newUserId = (yield db_1.db.write.table('Users').insert(user).execute()).rowCount;
                return (newUserId == 1) ? { message: 'New user created successfully' } : { message: 'Failed to create user' };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedUser = (yield db_1.db.update.table('Users').update(user).where('userId', '=', user.userId).execute()).rowCount;
                return (updatedUser == 1) ? { message: 'User updated successfully' } : { message: 'Failed to update user' };
            }
            catch (err) {
                throw err;
            }
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield db_1.db.delete.table('Users').where('userId', '=', userId).delete()).rows;
                return (user.length == 0) ? { message: 'User deleted successfully' } : { message: 'Failed to delete user' };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.class.js.map