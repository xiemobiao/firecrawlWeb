import React from 'react'; // 导入 React 库
import Layout from '../components/layout/Layout'; // 导入布局组件

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1>仪表盘</h1> // 仪表盘页面标题
      <p>这里显示用户仪表盘信息。</p> // 描述性文本
    </Layout>
  );
};

export default Dashboard; // 导出 Dashboard 组件