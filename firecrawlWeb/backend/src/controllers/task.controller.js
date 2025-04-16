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
exports.getTaskById = exports.createTask = exports.getUserTasks = void 0;
const tasks = [
    { id: 1, user_id: 1, name: '任务1', type: 'scrape', url: 'http://example.com', status: 'pending', progress: 0 },
    { id: 2, user_id: 1, name: '任务2', type: 'crawl', url: 'http://example.org', status: 'running', progress: 40 },
];
// 获取用户所有任务
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // 假设req.user.id 存在，暂时用1代替
    const userId = 1;
    const userTasks = tasks.filter(task => task.user_id === userId);
    res.json(userTasks);
});
exports.getUserTasks = getUserTasks;
// 创建新任务
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, name, type, url } = req.body;
    if (!user_id || !name || !type || !url) {
        return res.status(400).json({ message: '缺少必要字段' });
    }
    const newTask = {
        id: tasks.length + 1,
        user_id,
        name,
        type,
        url,
        status: 'pending',
        progress: 0,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});
exports.createTask = createTask;
// 获取单个任务详情
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ message: '任务不存在' });
    }
    res.json(task);
});
exports.getTaskById = getTaskById;
