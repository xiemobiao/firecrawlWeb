'use client';

import React, { useEffect, useState } from 'react';

interface Result {
  id: number;
  task_id: number;
  url: string;
  content_type: string;
  content?: string;
  metadata?: object;
  created_at: string;
}

export default function ResultListPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [taskId, setTaskId] = useState('');

  const fetchResults = async () => {
    if (!taskId) {
      setResults([]);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/result/task/${taskId}`);
      if (!response.ok) {
        throw new Error('获取结果列表失败');
      }
      const data = await response.json();
      setResults(data.results);
    } catch (err) {
      setError((err as Error).message || '网络错误');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (taskId) {
      fetchResults();
    }
  }, [taskId]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">爬虫结果列表</h1>
      <label className="block mb-4">
        任务ID:
        <input
          type="text"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
          className="border px-3 py-2 rounded ml-2"
          placeholder="输入任务ID以查询结果"
        />
      </label>
      {loading && <p>加载中...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && results.length === 0 && <p>无结果</p>}
      <ul className="space-y-4">
        {results.map((result) => (
          <li key={result.id} className="border p-4 rounded shadow">
            <p><strong>ID:</strong> {result.id}</p>
            <p><strong>URL:</strong> {result.url}</p>
            <p><strong>内容类型:</strong> {result.content_type}</p>
            <p>
              <strong>内容预览:</strong> {result.content ? result.content.substring(0, 100) + '...' : '无内容'}
            </p>
            <p><strong>创建时间:</strong> {result.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
