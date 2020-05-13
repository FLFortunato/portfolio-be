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
const user_model_1 = require("../models/user.model");
const express_1 = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
exports.UserController = () => {
    const router = express_1.Router();
    const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const check = yield user_model_1.User.findOne({ where: { email } });
        if (check) {
            return res.status(400).end("This e-mail is already being used.");
        }
        const salt = yield bcrypt.genSalt(10);
        const hashedPassowrd = yield bcrypt.hash(password, salt);
        const user = yield user_model_1.User.create({ name, email, password: hashedPassowrd });
        return res.status(201).json(user);
    });
    const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield user_model_1.User.findAll();
        return res.status(200).json(users);
    });
    const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const user = yield user_model_1.User.findOne({ where: { id } });
        if (!user)
            return res.status(404).end();
        return res.status(200).json(user);
    });
    const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const deleteUser = yield user_model_1.User.destroy({ where: { id } });
        if (!deleteUser) {
            return res.status(404).end();
        }
        return res.status(200);
    });
    const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const updateUser = yield user_model_1.User.update({ name, email, password }, { returning: true, where: { id } });
        return res.status(200).json(updateUser);
    });
    const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const user = yield user_model_1.User.findOne({ where: { email } });
        if (!user)
            return res.status(400).send("Email or Password is invalid e");
        const validPass = yield bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(400).send("Email or Password is invalid");
        const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
        return res.header('auth-token', token).send(token);
    });
    router.post("/", create);
    router.get("/", findAll);
    router.get("/:id", findOne);
    router.delete("/:id", deleteOne);
    router.put("/:id", update);
    router.post("/login", login);
    return router;
};
