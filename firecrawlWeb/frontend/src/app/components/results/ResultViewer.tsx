'use client';

import { useEffect, useState } from 'react';

interface Result {
  id: number;
  task_id: number;
  url: string;
  content_type: 'markdown' | 'html' | 'json' | 'screenshot';
  content: string;
  metadata: object | null;
}

interface ResultViewerProps {
  taskId: number;
}

export default function ResultViewer({ taskId }: ResultViewerProps) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/results/task/${taskId}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.message || '获取结果失败');
          setLoading(false);
          return;
        }
        const data = await response.json();
        setResults(data);
      } catch (_err) {
        setError('请求失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }
    fetchResults();
  }, [taskId]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (results.length === 0) return <div>暂无结果</div>;

  return (
    <div>
      {results.map(result => (
        <div key={result.id} className="mb-6">
          <h3 className="font-semibold mb-1">结果ID: {result.id}</h3>
          <p>类型: {result.content_type}</p>
          <p>URL: {result.url}</p>
          <div className="border p-2 rounded bg-gray-50 dark:bg-gray-900 whitespace-pre-wrap">
            {result.content}
          </div>
        </div>
      ))}
    </div>
  );
}