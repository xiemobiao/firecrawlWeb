'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TaskCreatePage() {
  const [name, setName] = useState('');
  const [type, setType] = useState('scrape');
  const [url, setUrl] = useState('');
  const [config, setConfig] = useState('{}');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, url, config: parsedConfig }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || '创建任务失败');
      } else {
        setSuccessMessage('任务创建成功');
        setName('');
        setType('scrape');
        setUrl('');
        setConfig('{}');
        // 跳转到任务列表页
        router.push('/tasks');
      }
    } catch {
      setError('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">创建新任务</h1>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? '创建中...' : '创建任务'}
        </button>
      </form>
    </div>
  );
}
