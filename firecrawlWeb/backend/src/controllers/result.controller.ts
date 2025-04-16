import { Request, Response } from 'express';

interface Result {
  id: number;
  task_id: number;
  url: string;
  content_type: 'markdown' | 'html' | 'json' | 'screenshot';
  content: string;
  metadata: object | null;
}

const results: Result[] = [
  {
    id: 1,
    task_id: 1,
    url: 'http://example.com/data1',
    content_type: 'markdown',
    content: '# Example Markdown Content',
    metadata: null,
  },
  {
    id: 2,
    task_id: 2,
    url: 'http://example.org/data2',
    content_type: 'html',
    content: '<p>Example HTML content</p>',
    metadata: null,
  },
];

// 根据任务ID获取结果列表
export const getResultsByTaskId = async (req: Request, res: Response) => {
  const taskId = Number(req.params.taskId);
  const filteredResults = results.filter(result => result.task_id === taskId);
  res.json(filteredResults);
};
