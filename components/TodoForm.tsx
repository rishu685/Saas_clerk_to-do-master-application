"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface TodoFormProps {
  onSubmit: (title: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-3 mb-8">
      <div className="flex-1 relative">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done today?"
          className="h-12 pl-4 pr-12 bg-background/80 backdrop-blur-sm border-border/20 shadow-lg focus:shadow-xl focus:border-primary/50 transition-all duration-200 placeholder:text-muted-foreground"
          required
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <Button 
        type="submit" 
        className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover-lift transition-all duration-200"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
