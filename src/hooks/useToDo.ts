import { useState, useEffect } from "react";
import type { Todo, FilterType } from "../types/todo";

const KEY = "";

export const useTodos = () => {
  const getInitialTodos = (): Todo[] => {
    try {
      const stored = localStorage.getItem(KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Ошибка чтения localStorage:", error);
      return [];
    }
  };

  const [todos, setTodos] = useState<Todo[]>(getInitialTodos);
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Ошибка записи в localStorage:", error);
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: trimmed,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    const trimmed = newText.trim();
    if (!trimmed) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo))
    );
  };

  const activeCount = todos.filter((todoel) => !todoel.completed).length;

  const filteredTodos = todos.filter((todoel) => {
    if (filter === "active") return !todoel.completed;
    if (filter === "completed") return todoel.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    activeCount,
  };
};
