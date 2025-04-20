import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
    role: 'admin' | 'user';
    username: string; // Added username to the type to match user data
  };
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    // 从请求头或 cookie 中获取令牌
    const token = req.headers.authorization?.split(' ')[1] || (req as any).cookies?.token; // 假设 cookie-parser 已安装和使用
    if (!token) {
      return res.status(401).json({ message: '未提供认证令牌' });
    }

    // 验证令牌
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'firecrawl-secret') as { id: number; email: string; role: 'admin' | 'user'; username: string }; // Update decoded type to include username
    
    // 将用户信息添加到请求对象
    (req as AuthenticatedRequest).user = decoded;
    
    next();
  } catch (error: unknown) {
    console.error('认证错误:', error);
    return res.status(401).json({ message: '无效的认证令牌' });
  }
};

// 角色验证中间件
export const roleMiddleware = (roles: Array<'admin' | 'user'>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      return res.status(401).json({ message: '未授权访问' });
    }
    
    if (!roles.includes(authReq.user.role)) {
      return res.status(403).json({ message: '权限不足' });
    }
    
    next();
  };
};
