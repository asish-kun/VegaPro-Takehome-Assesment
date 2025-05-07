
import React from 'react';
import { Task, TaskCard } from './TaskCard';

interface TaskGridProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskGrid = ({ tasks, onToggleComplete, onDelete }: TaskGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-fade-in">
      {tasks.map((task) => (
        <div key={task.id} className="animate-scale-in">
          <TaskCard 
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};
