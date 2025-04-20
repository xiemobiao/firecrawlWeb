import React from 'react';

const TaskDetails: React.FC<{ task: { id: number; name: string; status: string; url: string } }> = ({ task }) => {
  return (
    <div className="task-details">
      <h2>{task.name}</h2>
      <p>ID: {task.id}</p>
      <p>Status: {task.status}</p>
      <p>URL: {task.url}</p>
    </div>
  );
};

export default TaskDetails;