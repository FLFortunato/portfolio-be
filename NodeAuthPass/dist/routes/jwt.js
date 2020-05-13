"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.auth = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access denied');
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified;
    }
    catch (error) {
        res.status(400).send('Invalid Token');
    }
    return;
};
