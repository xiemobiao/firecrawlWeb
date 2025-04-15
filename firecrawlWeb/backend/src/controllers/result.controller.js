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
exports.exportResult = exports.getResultsByTask = void 0;
const result_model_1 = __importDefault(require("../models/result.model"));
const getResultsByTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taskId } = req.params;
        const results = yield result_model_1.default.findAll({ where: { task_id: taskId } });
        return res.status(200).json({ results });
    }
    catch (error) {
        console.error('获取任务结果错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.getResultsByTask = getResultsByTask;
const exportResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield result_model_1.default.findByPk(id);
        if (!result) {
            return res.status(404).json({ message: '结果不存在' });
        }
        // 这里简单返回内容，实际可根据需求导出为文件等
        return res.status(200).json({ content: result.content });
    }
    catch (error) {
        console.error('导出结果错误:', error);
        return res.status(500).json({ message: '服务器内部错误' });
    }
});
exports.exportResult = exportResult;
