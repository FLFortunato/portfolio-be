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
const company_model_1 = require("../models/company.model");
const express_1 = require("express");
exports.CompanyController = () => {
    const router = express_1.Router();
    const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { compName, content, compContact, compStatus } = req.body;
        const company = yield company_model_1.Company.create({ compName, content, compContact, compStatus });
        return res.status(201).json(company);
    });
    const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const companys = yield company_model_1.Company.findAll();
        return res.status(200).json(companys);
    });
    const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const company = yield company_model_1.Company.findOne({ where: { id } });
        if (!company_model_1.Company)
            return res.status(404).end();
        return res.status(200).json(company_model_1.Company);
    });
    const deleteOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const deleteCompany = yield company_model_1.Company.destroy({ where: { id } });
        if (!deleteCompany) {
            return res.status(404).end();
        }
        return res.status(200);
    });
    const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const { compName, content, compContact, compStatus } = req.body;
        const updateCompany = yield company_model_1.Company.update({ compName, content, compContact, compStatus }, { returning: true, where: { id } });
        return res.status(200).json(updateCompany);
    });
    router.post("/", create);
    router.get("/", findAll);
    router.get("/:id", findOne);
    router.delete("/:id", deleteOne);
    router.put("/:id", update);
    return router;
};
