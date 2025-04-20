import { Request, Response, NextFunction } from 'express';
import Task from '../models/task.model';
import { AuthenticatedRequest } from '../middlewares/auth.middleware'; // Import from auth.middleware to avoid duplication

// 创建任务
export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Early exit for error case
    }
    const { name, type, url, config } = req.body;
    const task = await Task.create({
      user_id: user.id,
      name,
      type,
      url,
      config,
    });
    void res.status(201).json({ message: '任务创建成功', task }); // Use void to ignore return value and ensure Promise<void>
  } catch (error: unknown) {
    next(error); // 传递错误到错误处理中间件
  }
};

// 获取所有任务
export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Early exit for error case
    }
    const tasks = await Task.findAll({ where: { user_id: user.id } });
    void res.json({ message: '任务列表获取成功', tasks }); // Use void to ignore return value and ensure Promise<void>
  } catch (error: unknown) {
    next(error); // 传递错误到错误处理中间件
  }
};

// 获取特定任务
export const getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Early exit for error case
    }
    const task = await Task.findOne({ where: { id: req.params.id, user_id: user.id } });
    if (!task) {
      res.status(404).json({ message: '任务不存在' });
      return; // Early exit for error case
    }
    void res.json({ message: '任务获取成功', task }); // Use void to ignore return value and ensure Promise<void>
  } catch (error: unknown) {
    next(error); // 传递错误到错误处理中间件
  }
};

// 更新任务
export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Early exit for error case
    }
    const { name, status, progress } = req.body;
    const [updated] = await Task.update({ name, status, progress }, { where: { id: req.params.id, user_id: user.id } });
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      if (updatedTask) {
        void res.json({ message: '任务更新成功', task: updatedTask }); // Use void to ignore return value and ensure Promise<void>
      } else {
        res.status(404).json({ message: '任务不存在' });
        return; // Early exit for error case
      }
    } else {
      res.status(404).json({ message: '任务不存在' });
      return; // Early exit for error case
    }
  } catch (error: unknown) {
    next(error); // 传递错误到错误处理中间件
  }
};

// 删除任务
export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = authReq.user;
    if (!user) {
      res.status(401).json({ message: '未授权访问' });
      return; // Early exit for error case
    }
    const deleted = await Task.destroy({ where: { id: req.params.id, user_id: user.id } });
    if (deleted) {
      void res.json({ message: '任务删除成功' }); // Use void to ignore return value and ensure Promise<void>
    } else {
      res.status(404).json({ message: '任务不存在' });
      return; // Early exit for error case
    }
  } catch (error: unknown) {
    next(error); // 传递错误到错误处理中间件
  }
};
