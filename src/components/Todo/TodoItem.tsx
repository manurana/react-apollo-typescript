import React, { SyntheticEvent } from "react";
import { withApollo, WithApolloClient } from "react-apollo";
import gql from "graphql-tag";
import { getMyTodos, getMyTodos_todos } from "../../__generated__/getMyTodos";
import { GET_MY_TODOS } from "./TodoPrivateList";

// https://www.trysmudford.com/blog/named-exports-withapollo-typescript-react/
// https://github.com/apollographql/react-apollo/issues/1759
// https://github.com/apollographql/react-apollo/issues/1759#issuecomment-503945304

export interface Props {
  index: string;
  todo: getMyTodos_todos;
}

const TodoItem: React.FC<WithApolloClient<Props>> = ({
  index,
  todo,
  client
}) => {
  const removeTodo = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    client.mutate({
      mutation: REMOVE_TODO,
      variables: { id: todo.id },
      optimisticResponse: {},
      update: cache => {
        const existingTodos: getMyTodos = cache.readQuery({
          query: GET_MY_TODOS
        }) || { todos: [] };
        const newTodos = existingTodos.todos.filter(t => t.id !== todo.id);
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos }
        });
      }
    });
  };

  const TOGGLE_TODO = gql`
    mutation toggleTodo($id: Int!, $isCompleted: Boolean!) {
      update_todos(
        where: { id: { _eq: $id } }
        _set: { is_completed: $isCompleted }
      ) {
        affected_rows
      }
    }
  `;

  const REMOVE_TODO = gql`
    mutation removeTodo($id: Int!) {
      delete_todos(where: { id: { _eq: $id } }) {
        affected_rows
      }
    }
  `;

  const toggleTodo = () => {
    client.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: todo.id, isCompleted: !todo.is_completed },
      optimisticResponse: {},
      update: cache => {
        // Fetch the todos from the cache
        const existingTodos: getMyTodos = cache.readQuery({
          query: GET_MY_TODOS
        }) || { todos: [] };
        const newTodos = existingTodos.todos.map(t => {
          if (t.id === todo.id) {
            return { ...t, is_completed: !t.is_completed };
          } else {
            return t;
          }
        });
        cache.writeQuery({
          query: GET_MY_TODOS,
          data: { todos: newTodos }
        });
      }
    });
  };

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

export default withApollo<Props>(TodoItem);
