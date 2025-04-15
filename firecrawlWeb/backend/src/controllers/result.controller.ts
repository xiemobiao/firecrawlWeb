// 删除重复导入，保留一次
import { Request, Response } from 'express';
import Result from '../models/result.model';

export const getResultsByTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const results = await Result.findAll({ where: { task_id: taskId } });
    return res.status(200).json({ results });
  } catch (error) {
    console.error('获取任务结果错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};

export const exportResult = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await Result.findByPk(id);
    if (!result) {
      return res.status(404).json({ message: '结果不存在' });
    }
    // 这里简单返回内容，实际可根据需求导出为文件等
    return res.status(200).json({ content: result.content });
  } catch (error) {
    console.error('导出结果错误:', error);
    return res.status(500).json({ message: '服务器内部错误' });
  }
};
