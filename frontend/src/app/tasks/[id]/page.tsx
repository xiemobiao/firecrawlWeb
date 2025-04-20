import React from 'react'; // 导入 React 库
import Layout from '../../components/layout/Layout'; // 导入布局组件
import TaskDetails from '../../components/tasks/TaskDetails'; // 导入任务详情组件

const TaskDetailPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  // 占位符：真实应用中根据 ID  fetching 任务数据
  const task = { id: params.id, name: 'Sample Task', status: 'running', url: 'https://example.com' };
  return (
    <Layout>
      <h1>任务详情</h1> // 任务详情页面标题
      <TaskDetails task={{ id: parseInt(params.id), name: 'Sample Task', status: 'running', url: 'https://example.com' }} /> // 渲染任务详情组件，转换 ID 为数字
    </Layout>
  );
};

export default TaskDetailPage; // 导出 TaskDetailPage 组件