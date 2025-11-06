import { useState } from "react";

type Props = {
  onAdd: (text: string) => void;
};

export const TodoForm = ({ onAdd }: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (text) {
      onAdd(text);
      setInput("");
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Какую задачу добавить?"
        className="todo-form__input"
      />
      <button type="submit" className="todo-form__button">
        Добавить
      </button>
    </form>
  );
};
