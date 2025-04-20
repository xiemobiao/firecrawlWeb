import React from 'react'; // 导入 React 库
import Layout from './components/layout/Layout'; // 导入布局组件

const Home: React.FC = () => {
  return (
    <Layout>
      <h1>欢迎使用 FireCrawl Web</h1> // 主标题
      <p>这里是主页内容。</p> // 描述性文本
    </Layout>
  );
};

export default Home; // 导出 Home 组件