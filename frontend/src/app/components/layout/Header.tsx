import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>FireCrawl Web</h1>
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;