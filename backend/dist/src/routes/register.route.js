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
exports.registerRoute = void 0;
const express_1 = require("express");
const user_class_1 = __importDefault(require("../classes/user.class"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.registerRoute = express_1.Router();
/*
 *
 * Prefix of this route is /register
 *
*/
/*
 *
 * Before creating the new user:- email is checked whether it is present in the database or not
 * if email is present then email already exists response is sent to the client
 * if email is not present then new user is created using the given credentials from the client and is stored in the database
 * and jwt token is created and sent to the client. jwt token includes subject property which has value of new user's userId and this token is encrypyted
 *
 *
*/
exports.registerRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body);
        const isExist = yield user_class_1.default.validateEmail(user.email);
        if (isExist.result) {
            res.json({ message: 'Email already exists' });
            return;
        }
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
//# sourceMappingURL=register.route.js.map