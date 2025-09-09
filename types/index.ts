// Define types for the application

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  isSubscribed: boolean;
  subscriptionEnds: Date | null;
  todos: Todo[];
}

export interface TodoWithUser extends Todo {
  user: User;
}

export interface PaginatedTodos {
  todos: Todo[];
  currentPage: number;
  totalPages: number;
}
