'use client';

import { useState } from 'react';

export default function TaskForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState('1'); // 暂时使用固定用户ID
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: Number(userId),
          name,
          type,
          url,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || '创建任务失败');
        setLoading(false);
        return;
      }

      setName('');
      setType('');
      setUrl('');
      setSuccess(true);
    } catch (err) {
      setError('请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col gap-4">
      {error && <div className="text-red-600">{error}</div>}
      {success && <div className="text-green-600">任务创建成功！</div>}
      <input
        type="text"
        placeholder="任务名称"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
        className="border p-2 rounded"
      >
        <option value="">选择任务类型</option>
        <option value="scrape">抓取</option>
        <option value="batch-scrape">批量抓取</option>
        <option value="crawl">爬取</option>
        <option value="map">地图</option>
      </select>
      <input
        type="url"
        placeholder="目标URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 rounded disabled:opacity-50"
      >
        {loading ? '创建中...' : '创建任务'}
      </button>
    </form>
  );
}