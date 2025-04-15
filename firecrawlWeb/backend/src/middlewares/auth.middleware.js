"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const secret = process.env.JWT_SECRET || 'your_jwt_secret';
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            req.user = decoded;
            next();
        }
        catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    }
    else {
        return res.status(401).json({ message: 'No token provided' });
    }
};
exports.authenticateJWT = authenticateJWT;
