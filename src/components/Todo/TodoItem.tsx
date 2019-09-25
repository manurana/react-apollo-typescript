import React, { SyntheticEvent } from "react";
// import ApolloClient from "apollo-client";
import { withApollo, WithApolloClient } from "react-apollo";
import gql from "graphql-tag";
import { getMyTodos_todos } from "../../__generated__/getMyTodos";
import { GET_MY_TODOS } from "./TodoPrivateList";

// https://www.trysmudford.com/blog/named-exports-withapollo-typescript-react/
// https://github.com/apollographql/react-apollo/issues/1759

export interface Props {
  index: string;
  todo: getMyTodos_todos;
  // client: ApolloClient<any>;
}

const TodoItem: React.FC<WithApolloClient<Props>> = ({
  index,
  todo,
  client
}) => {
  const removeTodo = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const toggleTodo = () => {
    client.mutate({
      mutation: TOGGLE_TODO,
      variables: { id: todo.id, isCompleted: !todo.is_completed },
      optimisticResponse: {}
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

export default withApollo(TodoItem);
// export default withApollo<{}, {}>(TodoItem);
// const MyAppWithApollo = withApollo<{}, {}>(MyApp);
