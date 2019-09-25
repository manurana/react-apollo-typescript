import React from "react";

import { getNewPublicTodos_todos } from "../../__generated__/getNewPublicTodos";
import { getOldPublicTodos_todos } from "../../__generated__/getOldPublicTodos";

interface Props {
  index: number;
  todo: getNewPublicTodos_todos | getOldPublicTodos_todos;
}

const TaskItem: React.FC<Props> = ({ index, todo }) => {
  return (
    <li>
      <div className="userInfoPublic" title={todo.user.name}>
        @{todo.user.name}
      </div>

      <div className={"labelContent" + (todo.is_completed ? " completed" : "")}>
        <div>{todo.title}</div>
      </div>
    </li>
  );
};

export default TaskItem;
