import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/task'; // 导入 Redux 存储
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Provider store={store}>
      <div className="layout">
        <Header />
        <div className="main-content">
          <Sidebar />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default Layout;