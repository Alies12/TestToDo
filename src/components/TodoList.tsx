import type { Todo } from "../types/todo";
import { TodoItem } from "./TodoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  activeCount: number;
  filter: string;
  onFilterChange: (filter: "all" | "active" | "completed") => void;
};

const getEmptyMessage = (filter: string) => {
  switch (filter) {
    case "all":
      return "Список пуст";
    case "active":
      return "Нет активных задач";
    case "completed":
      return "Нет выполненных задач";
  }
};

export const TodoList = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
  activeCount,
  filter,
  onFilterChange,
}: Props) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="todo-list__empty">{getEmptyMessage(filter)}</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}

      <div className="todo-footer">
        <span className="todo-footer__count">
          Задач осталось : {activeCount}
        </span>
        <div className="todo-filters">
          {(["all", "active", "completed"] as const).map((el) => (
            <button
              key={el}
              onClick={() => onFilterChange(el)}
              className={`todo-filters__button ${
                filter === el ? "todo-filters__button--active" : ""
              }`}
            >
              {el === "all"
                ? "Все"
                : el === "active"
                ? "Активные"
                : "Выполненные"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
