import React from 'react'; // 导入 React 库

const LoginForm: React.FC = () => {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm; // 导出 LoginForm 组件