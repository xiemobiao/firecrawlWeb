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

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTasks() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          const data = await response.json();
          setError(data.message || '获取任务失败');
          setLoading(false);
          return;
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError('请求失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  if (loading) return <div>加载任务中...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div>
      {tasks.length === 0 ? (
        <p>暂无任务</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map(task => (
            <li key={task.id} className="p-4">
              <h3 className="font-semibold">{task.name}</h3>
              <p>类型: {task.type}</p>
              <p>状态: {task.status}</p>
              <p>进度: {task.progress}%</p>
              <p>URL: {task.url}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}