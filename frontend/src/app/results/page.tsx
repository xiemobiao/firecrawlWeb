import React from 'react'; // 导入 React 库
import Layout from '../components/layout/Layout'; // 导入布局组件
import ResultViewer from '../components/results/ResultViewer'; // 导入结果查看器组件
import ResultFilter from '../components/results/ResultFilter'; // 导入结果过滤组件
import ResultExport from '../components/results/ResultExport'; // 导入结果导出组件

const ResultsPage: React.FC = () => {
  return (
    <Layout>
      <h1>结果管理</h1> // 结果页面标题
      <ResultFilter /> // 渲染结果过滤组件
      <ResultViewer content="Sample content" /> // 渲染结果查看器组件，传递示例内容
      <ResultExport /> // 渲染结果导出组件
    </Layout>
  );
};

export default ResultsPage; // 导出 ResultsPage 组件