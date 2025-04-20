import React from 'react'; // 导入 React 库

const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

export default Card; // 导出 Card 组件