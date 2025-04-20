import React from 'react';

const TaskProgress: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="task-progress">
      <p>Progress: {progress}%</p>
      <progress value={progress} max="100"></progress>
    </div>
  );
};

export default TaskProgress;