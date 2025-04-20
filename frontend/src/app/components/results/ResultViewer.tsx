import React from 'react'; // 导入 React 库

const ResultViewer: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="result-viewer">
      <h2>结果查看器</h2>
      <p>{content}</p>
    </div>
  );
};

export default ResultViewer; // 导出 ResultViewer 组件