import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>Dashboard</li>
        <li>Tasks</li>
        <li>Results</li>
        <li>Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;