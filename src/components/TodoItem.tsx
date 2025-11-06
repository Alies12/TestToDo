import { useState } from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
};

export const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [Text, setText] = useState(todo.text);

  const handleSave = () => {
    const trimmed = Text.trim();
    if (trimmed) {
      onEdit(todo.id, trimmed);
    } else {
      setText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-item__checkbox"
      />
      {isEditing ? (
        <input
          className="todo-item__edit-input"
          type="text"
          value={Text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={`todo-item__text ${
            todo.completed ? "todo-item__text--completed" : ""
          }`}
        >
          {todo.text}
        </span>
      )}
      <button onClick={() => onDelete(todo.id)} className="todo-item__delete">
        Удалить
      </button>
    </li>
  );
};
