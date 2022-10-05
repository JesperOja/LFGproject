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
const express_1 = __importDefault(require("express"));
const models_1 = require("../models");
const router = express_1.default.Router();
router.post('/SignUp', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.User.create({
        email: email,
        password: password
    });
    if (!user) {
        return res.status(401).json({
            error: 'Email already in use'
        });
    }
    else {
        return res.status(200).json(user);
    }
}));
router.post('/Login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield models_1.User.findOne({
        where: {
            email: email,
            password: password
        }
    });
    if (!user) {
        res.status(401).json({
            error: 'invalid username or password'
        });
    }
    else {
        res.status(200).json(user);
    }
}));
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll();
    res.send(users);
}));
exports.default = router;
