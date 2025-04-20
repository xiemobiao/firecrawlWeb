import { RequestHandler, Response, NextFunction } from 'express';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; // Import from auth.middleware for consistent type

// 注册用户
export const register: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: '邮箱已被注册' });
      return; // Explicitly return to ensure void
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建新用户
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 生成 JWT 令牌
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, username: user.username }, // Include username in token payload
      process.env.JWT_SECRET || 'firecrawl-secret',
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: '注册成功',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
    return; // Explicitly return to ensure void
  } catch (error: unknown) {
    console.error('注册错误:', error);
    next(error); // 传递错误到错误处理中间件
  }
};

// 用户登录
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 查找用户
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: '邮箱或密码错误' });
      return; // Explicitly return to ensure void
    }

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: '邮箱或密码错误' });
      return; // Explicitly return to ensure void
    }

    // 生成 JWT 令牌
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, username: user.username }, // Include username in token payload
      process.env.JWT_SECRET || 'firecrawl-secret',
      { expiresIn: '1d' }
    );

    res.json({
      message: '登录成功',
      user: { id: user.id, username: user.username, email: user.email, role: user.role },
      token,
    });
    return; // Explicitly return to ensure void
  } catch (error: unknown) {
    console.error('登录错误:', error);
    next(error); // 传递错误到错误处理中间件
  }
};

// 获取用户信息
export const getUserInfo: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Explicitly return to ensure void
    }
    res.json({
      id: user.id,
      username: user.username, // Now should be accessible with correct type
      email: user.email,
      role: user.role,
    });
    return; // Explicitly return to ensure void
  } catch (error: unknown) {
    console.error('获取用户信息错误:', error);
    next(error); // 传递错误到错误处理中间件
  }
};

// 更新用户信息
export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const authReq = req as AuthenticatedRequest;
    const userObj = authReq.user;
    if (!userObj) {
      res.status(401).json({ message: '未授权访问' });
      return; // Explicitly return to ensure void
    }
    const { username, email, password } = req.body;

    const updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    await User.update(updateData, { where: { id: userObj.id } });

    const updatedUser = await User.findByPk(userObj.id);
    if (!updatedUser) {
      res.status(404).json({ message: '用户不存在' });
      return; // Explicitly return to ensure void
    }
    res.json({
      message: '用户信息更新成功',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
    return; // Explicitly return to ensure void
  } catch (error: unknown) {
    console.error('更新用户信息错误:', error);
    next(error); // 传递错误到错误处理中间件
  }
};
