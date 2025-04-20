import React from 'react'; // 导入 React 库
import LoginForm from '../components/users/LoginForm'; // 导入登录表单组件

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>登录</h1> // 登录页面标题
      <LoginForm /> // 渲染登录表单
    </div>
  );
};

export default LoginPage; // 导出 LoginPage 组件