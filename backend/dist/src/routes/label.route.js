"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.labelRoute = void 0;
const express_1 = require("express");
const label_class_1 = __importStar(require("../classes/label.class"));
const contact_route_1 = require("./contact.route");
exports.labelRoute = express_1.Router();
/*
 *
 * Prefix of this route is /labels
 *
 *
*/
/*
 *
 * Return all labels of a specific user using userId which we get from jwt token after decrypting
 *
 *
*/
exports.labelRoute.get('/', contact_route_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const labels = yield label_class_1.default.getByUserId(userId);
        res.json(labels);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * Return a specific label of a particular user using labelId from route parameter and userId from jwt token after decrypting
 *
 *
*/
exports.labelRoute.get('/:labelId', contact_route_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const labelId = +req.params.labelId;
        const label = yield label_class_1.default.get(userId, labelId);
        res.json(label);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * Post a new label
 *
 *
*/
exports.labelRoute.post('/', contact_route_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const label = req.body.label;
        const newLabel = new label_class_1.LabelModel(label.userId, label.labelId, label.labelName);
        const newLabelResult = yield label_class_1.default.create(newLabel);
        res.json(newLabelResult);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * Update an existing label using labelId
 *
 *
*/
exports.labelRoute.put('/:labelId', contact_route_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const labelId = +req.params.labelId;
        const label = req.body.label;
        const updatedLabel = new label_class_1.LabelModel(label.userId, label.labelId, label.labelName);
        updatedLabel.modifiedAt = new Date();
        const updatedLabelResult = yield label_class_1.default.update(userId, labelId, updatedLabel);
        res.json(updatedLabelResult);
    }
    catch (err) {
        throw new Error(err);
    }
}));
/*
 *
 * Delete a specific label using labelId
 *
 *
*/
exports.labelRoute.delete('/:labelId', contact_route_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.subject;
        const labelId = +req.params.labelId;
        const labelResult = yield label_class_1.default.delete(userId, labelId);
        res.json(labelResult);
    }
    catch (err) {
        throw new Error(err);
    }
}));
//# sourceMappingURL=label.route.js.map