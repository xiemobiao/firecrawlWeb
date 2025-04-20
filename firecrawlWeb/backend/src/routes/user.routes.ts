import express from 'express';
import { register, login, getUserInfo, updateUser } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// 注册路由
 // @ts-ignore
router.post('/register', asyncHandler(register));

// 登录路由
 // @ts-ignore
router.post('/login', asyncHandler(login));

// 获取用户信息路由（需要认证）
 // @ts-ignore
router.get('/me', authMiddleware, asyncHandler(getUserInfo));

// 更新用户信息路由 (需要认证)
 // @ts-ignore
router.put('/me', authMiddleware, asyncHandler(updateUser));

export default router;
