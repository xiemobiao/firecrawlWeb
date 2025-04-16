'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Task {
  id: number;
  user_id: number;
  name: string;
  type: string;
  url: string;
  status: string;
  progress: number;
  config?: object;
  firecrawl_job_id?: string;
  start_time?: string;
  end_time?: string;
}

export default async function TaskDetailsPage({ params }: any) {
  const { id } = params;
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchTask = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/task/${id}`);
      if (!response.ok) {
        throw new Error('获取任务详情失败');
      }
      const data = await response.json();
      setTask(data.task);
    } catch (err) {
      setError((err as Error).message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) return <p>加载中...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>任务不存在</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">任务详情</h1>
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">{task.name}</h2>
        <p><strong>类型:</strong> {task.type}</p>
        <p><strong>URL:</strong> {task.url}</p>
        <p><strong>状态:</strong> {task.status}</p>
        <p><strong>进度:</strong> {task.progress}%</p>
        {task.config && (
          <div>
            <strong>配置:</strong>
            <pre className="bg-gray-100 p-2 rounded overflow-auto">{JSON.stringify(task.config, null, 2)}</pre>
          </div>
        )}
        {task.firecrawl_job_id && <p><strong>FireCrawl Job ID:</strong> {task.firecrawl_job_id}</p>}
        {task.start_time && <p><strong>开始时间:</strong> {task.start_time}</p>}
        {task.end_time && <p><strong>结束时间:</strong> {task.end_time}</p>}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        返回
      </button>
    </div>
  );
}
