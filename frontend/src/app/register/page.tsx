import React from 'react'; // 导入 React 库
import RegisterForm from '../components/users/RegisterForm'; // 导入注册表单组件

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h1>注册</h1> // 注册页面标题
      <RegisterForm /> // 渲染注册表单
    </div>
  );
};

export default RegisterPage; // 导出 RegisterPage 组件