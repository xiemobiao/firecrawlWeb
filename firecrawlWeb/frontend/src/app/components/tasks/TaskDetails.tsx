'use client';

import { useEffect, useState } from 'react';

interface Task {
  id: number;
  user_id: number;
  name: string;
  type: string;
  url: string;
  status: string;
  progress: number;
}

interface TaskDetailsProps {
  taskId: number;
}

export default function TaskDetails({ taskId }: TaskDetailsProps) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTask() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/tasks/${taskId}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.message || '获取任务详情失败');
          setLoading(false);
          return;
        }
        const data = await response.json();
        setTask(data);
      } catch (err) {
        setError('请求失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [taskId]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!task) return <div>无任务详情</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
      <p>类型: {task.type}</p>
      <p>状态: {task.status}</p>
      <p>进度: {task.progress}%</p>
      <p>URL: {task.url}</p>
    </div>
  );
}