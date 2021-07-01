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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_class_1 = __importDefault(require("../classes/user.class"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.router = express_1.Router();
//router.use('', contact);
// prefix /users
//get all users
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_class_1.default.list();
        res.json(users);
    }
    catch (err) {
        throw new Error(err);
    }
}));
//get 1 user
exports.router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.userId;
        const user = yield user_class_1.default.get(userId);
        if (user.length == 0) {
            res.json({ message: 'User does not exist' });
            return;
        }
        const payload = {
            subject: userId
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secret key');
        res.json({ token });
    }
    catch (err) {
        throw new Error(err);
    }
}));
//post 1 user
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body);
        const newUser = yield user_class_1.default.create(user);
        if (!newUser.result) {
            res.json(newUser.message);
            return;
        }
        const payload = {
            subject: user.userId
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secret key');
        res.json({ token });
    }
    catch (err) {
        throw new Error(err);
    }
}));
//update 1 user
exports.router.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body);
        const updatedUser = yield user_class_1.default.update(user);
        if (!updatedUser.result) {
            res.json(updatedUser.message);
            return;
        }
        res.json(updatedUser.message);
    }
    catch (err) {
        throw new Error(err);
    }
}));
//delete 1 user
exports.router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = +req.params.userId;
        const deletedUser = yield user_class_1.default.delete(userId);
        if (!deletedUser.result) {
            res.json(deletedUser.message);
            return;
        }
        res.json(deletedUser.message);
    }
    catch (err) {
        throw new Error(err);
    }
}));
//# sourceMappingURL=user.route.js.map