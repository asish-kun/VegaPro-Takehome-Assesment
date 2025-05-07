
import React, { useState, useRef, useEffect } from 'react';
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react';
import { Priority } from './TaskCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TaskInputProps {
  onAddTask: (title: string, description: string, priority: Priority) => void;
}

export const TaskInput = ({ onAddTask }: TaskInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<Priority>('none');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-resize the textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Only collapse if clicking outside the entire container
    if (!inputContainerRef.current?.contains(e.relatedTarget as Node)) {
      if (!content.trim()) {
        setIsExpanded(false);
        setPriority('none');
      }
    }
  };

  const handleSubmit = () => {
    const contentLines = content.trim().split('\n');
    const title = contentLines[0] || 'Untitled';
    const description = contentLines.slice(1).join('\n').trim();
    
    if (title) {
      onAddTask(title, description, priority);
      setContent('');
      setPriority('none');
      setIsExpanded(false);
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div 
      ref={inputContainerRef}
      className={cn(
        "task-input-container mx-auto transition-all duration-300 mb-8",
        isExpanded ? "max-w-2xl" : "max-w-xl"
      )}
    >
      <div className="p-3">
        <textarea
          ref={inputRef}
          className="w-full resize-none outline-none placeholder:text-gray-500 min-h-[40px]"
          placeholder={isExpanded ? "Title" : "Take a note..."}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          rows={isExpanded ? 3 : 1}
        />
      </div>
      
      {isExpanded && (
        <div className="flex items-center justify-between p-2 border-t border-purple-100">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn("priority-button", { "priority-button-active": priority === 'low' })}
              onClick={() => setPriority(priority === 'low' ? 'none' : 'low')}
              title="Low Priority"
            >
              <ArrowDown className={cn("h-4 w-4", priority === 'low' ? "text-priority-low" : "text-gray-500")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("priority-button", { "priority-button-active": priority === 'medium' })}
              onClick={() => setPriority(priority === 'medium' ? 'none' : 'medium')}
              title="Medium Priority"
            >
              <ArrowRight className={cn("h-4 w-4", priority === 'medium' ? "text-priority-medium" : "text-gray-500")} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("priority-button", { "priority-button-active": priority === 'high' })}
              onClick={() => setPriority(priority === 'high' ? 'none' : 'high')}
              title="High Priority"
            >
              <ArrowUp className={cn("h-4 w-4", priority === 'high' ? "text-priority-high" : "text-gray-500")} />
            </Button>
          </div>
          
          <Button
            className="text-sm font-medium bg-primary hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={!content.trim()}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
};
