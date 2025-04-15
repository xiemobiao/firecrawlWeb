// 删除重复导入，保留一次
import { Request, Response } from 'express';
import Task from '../models/task.model';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { user_id, name, type, url, config } = req.body;
    if (!user_id || !name || !type || !url) {
      return res.status(400).json({ message: '缺少必要的任务参数' });
    }

    const newTask = await Task.create({
      user_id,
      name,
      type,
      url,
      config,
      status: 'pending',
      progress: 0,
    });

    return res.status(201).json({ message: '任务创建成功', task: newTask });
  } catch (error) {
    console.error('创建任务错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    return res.status(200).json({ tasks });
  } catch (error) {
    console.error('获取任务列表错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: '任务不存在' });
    }
    return res.status(200).json({ task });
  } catch (error) {
    console.error('获取任务详情错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};
