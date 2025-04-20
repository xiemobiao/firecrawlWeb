import React from 'react'; // 导入 React 库

const Alert: React.FC<{ message: string; type: 'success' | 'error' }> = ({ message, type }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
    </div>
  );
};

export default Alert; // 导出 Alert 组件