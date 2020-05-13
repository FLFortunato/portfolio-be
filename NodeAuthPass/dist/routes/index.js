"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../controllers/user.controller");
const cards_controller_1 = require("../controllers/cards.controller");
const express_1 = require("express");
const publicRoutes = [
    { path: '/user', route: user_controller_1.UserController() },
    { path: '/company', route: cards_controller_1.CompanyController() }
];
exports.AppController = () => {
    const router = express_1.Router();
    publicRoutes.forEach(routers => router.use(routers.path, routers.route));
    return router;
};
