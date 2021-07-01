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
exports.loginRoute = void 0;
const express_1 = require("express");
const user_class_1 = __importDefault(require("../classes/user.class"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.loginRoute = express_1.Router();
/*
 * Prefix of this route is /login
*/
/*
 *
 * Before login:- email and password is checked in the database whether it is correct or not
 * If correct email and password is provided by the client then jwt token is created and sent to the client. jwt token includes subject property which has the value of loginUser's userId and this token is encrypted
 * If incorrect email or password is provided by the client then incorrect email or password response is sent to the client
 *
 *
 *
*/
exports.loginRoute.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = Object.assign({}, req.body);
        const userEmail = yield user_class_1.default.validateEmail(loginUser.email);
        const userPassword = yield user_class_1.default.validatePassword(loginUser.password);
        if (!(userEmail.result && userEmail.result) || (userEmail.userId != userPassword.userId)) {
            res.json({ message: 'Incorrect email or password' });
            return;
        }
        const payload = {
            subject: (userEmail.userId == userPassword.userId) ? +userEmail.userId : null
        };
        const token = jsonwebtoken_1.default.sign(payload, 'secret key');
        res.json({ token });
    }
    catch (err) {
        throw new Error(err);
    }
}));
//# sourceMappingURL=login.route.js.map