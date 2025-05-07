
import React, { useState } from 'react';
import { Circle, Check, ArrowUp, ArrowRight, ArrowDown, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Priority = 'low' | 'medium' | 'high' | 'none';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
}

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TaskCard = ({ task, onToggleComplete, onDelete }: TaskCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleComplete = () => {
    onToggleComplete(task.id);
  };

  const renderPriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return <ArrowUp className="h-5 w-5 text-priority-high" />;
      case 'medium':
        return <ArrowRight className="h-5 w-5 text-priority-medium" />;
      case 'low':
        return <ArrowDown className="h-5 w-5 text-priority-low" />;
      default:
        return null;
    }
  };

  const cardClasses = cn(
    'note-card p-4 h-full flex flex-col', 
    {
      'completed': task.completed,
      'priority-low': !task.completed && task.priority === 'low',
      'priority-medium': !task.completed && task.priority === 'medium',
      'priority-high': !task.completed && task.priority === 'high',
    }
  );

  return (
    <div 
      className={cardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleToggleComplete}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className={cn("font-medium text-lg break-words", { "line-through opacity-70": task.completed })}>
          {task.title}
        </h3>
        
        <div className="flex items-center space-x-1">
          {task.priority !== 'none' && renderPriorityIcon()}
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleToggleComplete();
            }}
            className="transition-colors duration-200 rounded-full p-0.5 hover:bg-gray-100"
          >
            {task.completed ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Circle className={cn("h-5 w-5 text-gray-400", { "text-green-500": isHovered })} />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="transition-colors duration-200 rounded-full p-0.5 hover:bg-red-100"
            title="Delete"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
          
        </div>
      </div>
      
      {task.description && (
        <div className={cn("text-sm text-gray-600 flex-grow break-words", { "line-through opacity-70": task.completed })}>
          {task.description}
        </div>
      )}
    </div>
  );
};
