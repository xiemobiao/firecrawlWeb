import { Request, Response } from 'express';

export const healthCheck = async (req: Request, res: Response) => {
  // 健康检查接口
  res.status(200).json({ status: 'ok', timestamp: new Date() });
};

export const getSystemInfo = async (req: Request, res: Response) => {
  // TODO: 实现系统信息获取逻辑
  res.status(501).json({ message: 'Not implemented' });
};
