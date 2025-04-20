import React, { useState } from 'react'; // 导入 React 和 useState 钩子，用于管理组件状态
import { useAppDispatch } from '../../store/task'; // 导入 useAppDispatch 钩子，从 store/task.ts 导入，用于类型化 dispatch
import { createTask } from '../../store/task'; // 导入 createTask 异步 action creator，从 store/task.ts 导入

// TaskForm 组件，用于创建新任务。用户可以输入任务名称、URL 和类型，然后提交以创建任务。
const TaskForm: React.FC = () => {
  const [name, setName] = useState(''); // 状态变量：任务名称，初始值为空字符串
  const [url, setUrl] = useState(''); // 状态变量：任务 URL，初始值为空字符串
  const [type, setType] = useState('scrape'); // 状态变量：任务类型，初始值为 'scrape'，表示默认刮取类型
  const dispatch = useAppDispatch(); // 获取类型化的 dispatch 函数，确保类型安全和正确处理异步 action

  // 处理表单提交事件，创建新任务并派发 action
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 防止表单默认提交行为，保持页面不刷新
    const newTask = { name, url, type, status: 'pending' }; // 创建新任务对象，状态设为 'pending' 表示等待处理
    dispatch(createTask(newTask)); // 派发 createTask action，触发异步操作创建任务
    setName(''); // 重置任务名称输入字段
    setUrl(''); // 重置 URL 输入字段
    setType('scrape'); // 重置任务类型选择为默认值
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="scrape">Scrape</option>
        <option value="batch-scrape">Batch Scrape</option>
        <option value="crawl">Crawl</option>
        <option value="map">Map</option>
      </select>
      <button type="submit">Create Task</button> // 提交按钮，点击后创建任务并清空表单
    </form>
  );
};

export default TaskForm; // 导出 TaskForm 组件，以便在其他文件中使用