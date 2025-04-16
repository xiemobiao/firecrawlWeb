import { Request, Response } from 'express';

// 模拟任务数据
interface Task {
  id: number;
  user_id: number;
  name: string;
  type: string;
  url: string;
  status: string;
  progress: number;
}

const tasks: Task[] = [
  { id: 1, user_id: 1, name: '任务1', type: 'scrape', url: 'http://example.com', status: 'pending', progress: 0 },
  { id: 2, user_id: 1, name: '任务2', type: 'crawl', url: 'http://example.org', status: 'running', progress: 40 },
];

// 获取用户所有任务
export const getUserTasks = async (req: Request, res: Response) => {
  // 假设req.user.id 存在，暂时用1代替
  const userId = 1;
  const userTasks = tasks.filter(task => task.user_id === userId);
  res.json(userTasks);
};

// 创建新任务
export const createTask = async (req: Request, res: Response) => {
  const { user_id, name, type, url } = req.body;
  if (!user_id || !name || !type || !url) {
    return res.status(400).json({ message: '缺少必要字段' });
  }
  const newTask: Task = {
    id: tasks.length + 1,
    user_id,
    name,
    type,
    url,
    status: 'pending',
    progress: 0,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

// 获取单个任务详情
export const getTaskById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: '任务不存在' });
  }
  res.json(task);
};
