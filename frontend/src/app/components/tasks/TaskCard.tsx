import React from 'react';

const TaskCard: React.FC<{ task: { id: number; name: string; status: string } }> = ({ task }) => {
  return (
    <div className="task-card">
      <h3>{task.name}</h3>
      <p>Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;