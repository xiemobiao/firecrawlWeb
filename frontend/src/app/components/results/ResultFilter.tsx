import React from 'react';

const ResultFilter: React.FC = () => {
  return (
    <div className="result-filter">
      <input type="text" placeholder="Filter results" />
      <button>Apply Filter</button>
    </div>
  );
};

export default ResultFilter;