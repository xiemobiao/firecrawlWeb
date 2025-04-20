import React from 'react'; // 导入 React 库
import Layout from '../../components/layout/Layout'; // 导入布局组件
import TaskForm from '../../components/tasks/TaskForm'; // 导入任务表单组件

const CreateTaskPage: React.FC = () => {
  return (
    <Layout>
      <h1>创建新任务</h1> // 创建任务页面标题
      <TaskForm /> // 渲染任务创建表单
    </Layout>
  );
};

export default CreateTaskPage; // 导出 CreateTaskPage 组件