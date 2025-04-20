import express from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// 创建任务路由
router.post('/', authMiddleware, createTask);

// 获取所有任务路由
router.get('/', authMiddleware, getTasks);

// 获取特定任务路由
router.get('/:id', authMiddleware, getTaskById);

// 更新任务路由
router.put('/:id', authMiddleware, updateTask);

// 删除任务路由
router.delete('/:id', authMiddleware, deleteTask);

export default router;
