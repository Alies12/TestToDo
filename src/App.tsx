import { TodoForm } from "./components/TodoForm";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useToDo";

import "./styles/index.css";

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    activeCount,
  } = useTodos();

  return (
    <div className="todo-app">
      <h1 className="todo-app__header">Список задач</h1>
      <TodoForm onAdd={addTodo} />
      <TodoList
        todos={todos}
        filter={filter}
        onFilterChange={setFilter}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        activeCount={activeCount}
      />
    </div>
  );
}
