import React, { SyntheticEvent } from "react";

import { getMyTodos_todos } from "../../__generated__/getMyTodos";

export interface Props {
  index: string;
  todo: getMyTodos_todos;
}

const TodoItem: React.FC<Props> = ({ index, todo }) => {
  const removeTodo = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleTodo = () => {};

  return (
    <li>
      <div className="view">
        <div className="round">
          <input
            checked={todo.is_completed}
            type="checkbox"
            id={todo.id.toString()}
            onChange={toggleTodo}
          />
          <label htmlFor={todo.id.toString()} />
        </div>
      </div>

      <div className={"labelContent" + (todo.is_completed ? " completed" : "")}>
        <div>{todo.title}</div>
      </div>

      <button className="closeBtn" onClick={removeTodo}>
        x
      </button>
    </li>
  );
};

export default TodoItem;
