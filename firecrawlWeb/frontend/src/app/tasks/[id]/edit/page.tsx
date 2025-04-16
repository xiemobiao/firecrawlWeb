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

export default async function TaskEditPage({ params }: any) {
  const { id } = params;
  const [task, setTask] = useState<Task | null>(null);
  const [name, setName] = useState('');
  const [type, setType] = useState('scrape');
  const [url, setUrl] = useState('');
  const [config, setConfig] = useState('{}');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
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
      setName(data.task.name);
      setType(data.task.type);
      setUrl(data.task.url);
      setConfig(JSON.stringify(data.task.config || {}, null, 2));
      setStatus(data.task.status);
    } catch (err) {
      setError((err as Error).message || '网络错误');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    let parsedConfig;
    try {
      parsedConfig = JSON.parse(config);
    } catch {
      setError('配置必须是有效的JSON格式');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, url, config: parsedConfig, status }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || '更新任务失败');
      } else {
        setSuccessMessage('任务更新成功');
        // 跳转到任务详情页
        router.push(`/tasks/${id}`);
      }
    } catch {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !task) return <p>加载中...</p>;
  if (error && !task) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>任务不存在</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">编辑任务</h1>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          任务名称
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          任务类型
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="scrape">抓取 (scrape)</option>
            <option value="batch-scrape">批量抓取 (batch-scrape)</option>
            <option value="crawl">爬取 (crawl)</option>
            <option value="map">地图 (map)</option>
          </select>
        </label>
        <label className="block mb-2">
          目标URL
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </label>
        <label className="block mb-2">
          状态
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="pending">待处理</option>
            <option value="running">进行中</option>
            <option value="completed">已完成</option>
            <option value="failed">失败</option>
            <option value="cancelled">已取消</option>
          </select>
        </label>
        <label className="block mb-4">
          配置 (JSON格式)
          <textarea
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            className="w-full border px-3 py-2 rounded font-mono"
            rows={6}
          />
        </label>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? '更新中...' : '更新任务'}
        </button>
      </form>
    </div>
  );
}
