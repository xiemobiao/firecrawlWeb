import React from 'react'; // 导入 React 库
import Layout from '../components/layout/Layout'; // 导入布局组件
import UserProfile from '../components/users/UserProfile'; // 导入用户资料组件

const SettingsPage: React.FC = () => {
  return (
    <Layout>
      <h1>设置</h1> // 设置页面标题
      <UserProfile /> // 渲染用户资料组件
      {/* 添加更多设置选项 */}
    </Layout>
  );
};

export default SettingsPage; // 导出 SettingsPage 组件