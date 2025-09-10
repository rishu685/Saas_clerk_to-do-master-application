"use client";

import { useState } from "react";
import { Todo } from "@/types";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TodoItemProps {
  todo: Todo;
  isAdmin?: boolean;
  onUpdate: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  isAdmin = false,
  onUpdate,
  onDelete,
}: TodoItemProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);

  const toggleComplete = async () => {
    setIsToggling(true);
    try {
      const newCompletedState = !isCompleted;
      setIsCompleted(newCompletedState);
      await onUpdate(todo.id, newCompletedState);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <Card className={`group transition-all duration-300 hover:shadow-lg hover-lift ${
      isCompleted 
        ? 'bg-gradient-to-r from-green-50/80 to-emerald-50/80 border-green-200/50' 
        : 'bg-white/80 backdrop-blur-sm border-white/20'
    } shadow-md`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleComplete}
              disabled={isToggling}
              className={`h-8 w-8 rounded-full transition-all duration-200 ${
                isCompleted
                  ? 'bg-green-100 text-green-600 hover:bg-green-200'
                  : 'bg-slate-100 text-slate-400 hover:bg-blue-100 hover:text-blue-600'
              }`}
            >
              {isToggling ? (
                <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
              ) : isCompleted ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <div className="w-4 h-4 border-2 border-current rounded-full" />
              )}
            </Button>
            
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium transition-all duration-200 ${
                isCompleted 
                  ? 'text-green-700 line-through' 
                  : 'text-slate-900'
              }`}>
                {todo.title}
              </p>
              <div className="flex items-center mt-1 text-xs text-slate-500">
                <Clock className="w-3 h-3 mr-1" />
                <span>Created {formatDate(todo.createdAt)}</span>
                {isAdmin && (
                  <>
                    <span className="mx-2">•</span>
                    <span>User: {todo.userId.slice(0, 8)}...</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 hover:text-red-600"
          >
            {isDeleting ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
