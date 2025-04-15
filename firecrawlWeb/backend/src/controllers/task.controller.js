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
exports.getTaskById = exports.getTasks = exports.createTask = void 0;
const task_model_1 = __importDefault(require("../models/task.model"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id, name, type, url, config } = req.body;
        if (!user_id || !name || !type || !url) {
            return res.status(400).json({ message: '缺少必要的任务参数' });
        }
        const newTask = yield task_model_1.default.create({
            user_id,
            name,
            type,
            url,
            config,
            status: 'pending',
            progress: 0,
        });
        return res.status(201).json({ message: '任务创建成功', task: newTask });
    }
    catch (error) {
        console.error('创建任务错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.findAll();
        return res.status(200).json({ tasks });
    }
    catch (error) {
        console.error('获取任务列表错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.getTasks = getTasks;
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_model_1.default.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: '任务不存在' });
        }
        return res.status(200).json({ task });
    }
    catch (error) {
        console.error('获取任务详情错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.getTaskById = getTaskById;
