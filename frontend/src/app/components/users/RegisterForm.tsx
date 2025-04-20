import React from 'react'; // 导入 React 库

const RegisterForm: React.FC = () => {
  return (
    <form>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <input type="password" placeholder="Confirm Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm; // 导出 RegisterForm 组件