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
exports.getUserProfile = exports.login = exports.register = void 0;
// 删除重复导入，保留一次
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: '用户名、邮箱和密码是必填项' });
        }
        // 检查用户是否已存在
        const existingUser = yield user_model_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: '该邮箱已被注册' });
        }
        // 密码加密
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // 创建用户
        const newUser = yield user_model_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ message: '注册成功', userId: newUser.id });
    }
    catch (error) {
        console.error('注册错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: '邮箱和密码是必填项' });
        }
        const user = yield user_model_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: '无效的邮箱或密码' });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: '无效的邮箱或密码' });
        }
        // 生成JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: '登录成功', token });
    }
    catch (error) {
        console.error('登录错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.login = login;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 从请求头中获取token
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: '未提供认证信息' });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: '无效的认证信息' });
        }
        // 验证token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const userId = decoded.userId;
        const user = yield user_model_1.default.findByPk(userId, {
            attributes: ['id', 'username', 'email', 'createdAt'],
        });
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }
        return res.status(200).json({ user });
    }
    catch (error) {
        console.error('获取用户信息错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.getUserProfile = getUserProfile;
