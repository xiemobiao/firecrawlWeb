import React from 'react'; // 导入 React 库

const UserProfile: React.FC = () => {
  return (
    <div className="user-profile">
      <h2>用户资料</h2> // 用户资料标题
      <p>用户名: UserName</p> // 显示用户名
      <p>电子邮件: email@example.com</p> // 显示电子邮件
    </div>
  );
};

export default UserProfile; // 导出 UserProfile 组件