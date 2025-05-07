
import React, { useState, useEffect } from 'react';
import { TaskInput } from '@/components/TaskInput';
import { TaskGrid } from '@/components/TaskGrid';
import { Task, Priority } from '@/components/TaskCard';
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const BASE = "http://localhost:3001";

export interface TaskDTO {
  id: string;
  title: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "none";
  is_completed: boolean;
  created_at: string;
}

const toView = (t: TaskDTO): Task => ({
  id: t.id,
  title: t.title,
  description: t.description ?? "",
  completed: t.is_completed,
  priority: t.priority
});

const Index = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch tasks
  const { data: rawTasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async (): Promise<TaskDTO[]> => {
      const res = await fetch(`${BASE}/tasks`);
      return res.json();
    }
  });

  console.log("Fetched raw tasks:", rawTasks);


  const tasks: Task[] = rawTasks.map(toView);

  const addTaskMutation = useMutation({
    mutationFn: async (task: Omit<TaskDTO, 'id' | 'is_completed' | 'created_at'>) => {
      const newTask = {
        id: uuidv4(),
        is_completed: false,
        created_at: new Date().toISOString(),
        ...task
      };
      const res = await fetch(`${BASE}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask)
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Task added", duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const handleAddTask = (title: string, description: string, priority: Priority) => {
    addTaskMutation.mutate({ title, description, priority });
  };

  // Mark done API Call
  const toggleTaskCompletionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE}/tasks/${id}/complete`, {
        method: "PUT"
      });
      if (!res.ok) throw new Error("Failed to toggle completion");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Toggled task completion", duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  
  const handleToggleComplete = (id: string) => {
    toggleTaskCompletionMutation.mutate(id);
  };


  //DELETE API CALL
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE}/tasks/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete task");
    },
    onSuccess: () => {
      toast({ title: "Task deleted", duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });
  
  const handleDeleteTask = (id: string) => {
    deleteTaskMutation.mutate(id);
  };

  // Sort tasks
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed && !b.completed) return 1;
    if (!a.completed && b.completed) return -1;
    const priorityValues = { high: 3, medium: 2, low: 1, none: 0 };
    return priorityValues[b.priority] - priorityValues[a.priority];
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tasks Board</h1>
          <p className="text-gray-600">Create and organize your tasks according to thier priority levels</p>
        </header>
        
        <TaskInput onAddTask={handleAddTask} />
        
        {tasks.length > 0 ? (
          <TaskGrid tasks={sortedTasks} onToggleComplete={handleToggleComplete} onDelete={handleDeleteTask} />
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No notes yet. Start by adding one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
