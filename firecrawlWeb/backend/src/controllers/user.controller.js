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
exports.login = exports.register = exports.getUserProfile = void 0;
// 用户控制器示例实现
// 模拟用户数据
const users = [
    { id: 1, username: 'user1', email: 'user1@example.com', password: 'pass1' },
    { id: 2, username: 'user2', email: 'user2@example.com', password: 'pass2' },
];
// 获取用户资料
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // 假设req.user存储了用户信息
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ message: '用户不存在' });
    }
    res.json({ id: user.id, username: user.username, email: user.email });
});
exports.getUserProfile = getUserProfile;
// 注册新用户
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: '缺少必要字段' });
    }
    const exists = users.find(user => user.username === username || user.email === email);
    if (exists) {
        return res.status(409).json({ message: '用户名或邮箱已存在' });
    }
    const newUser = {
        id: users.length + 1,
        username,
        email,
        password,
    };
    users.push(newUser);
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
});
exports.register = register;
// 用户登录示例（不安全的示例，正式环境建议jwt等认证方式）
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: '用户名或密码错误' });
    }
    res.json({ message: '登录成功', user: { id: user.id, username: user.username, email: user.email } });
});
exports.login = login;
