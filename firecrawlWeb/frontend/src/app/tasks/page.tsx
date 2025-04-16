'use client';

import React, { useEffect, useState } from 'react';

interface Task {
  id: number;
  user_id: number;
  name: string;
  type: string;
  url: string;
  status: string;
  progress: number;
}

export default function TaskListPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/task');
      if (!response.ok) {
        throw new Error('获取任务列表失败');
      }
      const data = await response.json();
      setTasks(data.tasks);
    } catch (err) {
      setError((err as Error).message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">任务列表</h1>
      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{task.name}</h2>
              <p>类型: {task.type}</p>
              <p>URL: {task.url}</p>
              <p>状态: {task.status}</p>
              <p>进度: {task.progress}%</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
