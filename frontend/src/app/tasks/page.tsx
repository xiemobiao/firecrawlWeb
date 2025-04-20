import React from 'react'; // 导入 React 库
import Layout from '../components/layout/Layout'; // 导入布局组件
import TaskList from '../components/tasks/TaskList'; // 导入任务列表组件
import TaskForm from '../components/tasks/TaskForm'; // 导入任务表单组件

const TasksPage: React.FC = () => {
  return (
    <Layout>
      <h1>任务管理</h1> // 任务页面标题
      <TaskForm /> // 渲染任务创建表单
      <TaskList /> // 渲染任务列表
    </Layout>
  );
};

export default TasksPage; // 导出 TasksPage 组件