// 删除重复导入，保留一次
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: '用户名、邮箱和密码是必填项' });
    }

    // 检查用户是否已存在
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: '该邮箱已被注册' });
    }

    // 密码加密
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: '注册成功', userId: newUser.id });
  } catch (error) {
    console.error('注册错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: '邮箱和密码是必填项' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: '无效的邮箱或密码' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: '无效的邮箱或密码' });
    }

    // 生成JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({ message: '登录成功', token });
  } catch (error) {
    console.error('登录错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
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
    const decoded: any = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId;

    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'email', 'createdAt'],
    });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('获取用户信息错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};
