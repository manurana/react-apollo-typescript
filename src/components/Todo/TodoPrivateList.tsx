import React, { Component, Fragment } from "react";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import gql from "graphql-tag";
import { Query, WithApolloClient } from "react-apollo";

import { getMyTodos, getMyTodos_todos } from "../../__generated__/getMyTodos";

export const GET_MY_TODOS = gql`
  query getMyTodos {
    todos(
      where: { is_public: { _eq: false } }
      order_by: { created_at: desc }
    ) {
      id
      title
      created_at
      is_completed
    }
  }
`;

type filter = "all" | "completed" | "active";

interface MyProps {
  todos: getMyTodos_todos[];
}

interface MyState {
  filter: filter;
  clearInProgress: boolean;
}

class TodoPrivateList extends Component<WithApolloClient<MyProps>, MyState> {
  state: MyState = {
    filter: "all",
    clearInProgress: false
  };

  filterResults = (filter: filter) => {
    this.setState({
      ...this.state,
      filter: filter
    });
  };

  clearCompleted = () => {
    // Remove all the todos that are completed
    const CLEAR_COMPLETED = gql`
      mutation clearCompleted {
        delete_todos(
          where: { is_completed: { _eq: true }, is_public: { _eq: false } }
        ) {
          affected_rows
        }
      }
    `;

    this.props.client.mutate({
      mutation: CLEAR_COMPLETED,
      optimisticResponse: {},
      update: (cache, { data }) => {
        const existingTodos: getMyTodos = cache.readQuery({
          query: GET_MY_TODOS
        }) || { todos: [] };
        const newTodos = existingTodos.todos.filter(t => !t.is_completed);
        cache.writeQuery({ query: GET_MY_TODOS, data: { todos: newTodos } });
      }
    });
  };

  render(): React.ReactNode {
    const { todos } = this.props;
    let filteredTodos = todos;
    if (this.state.filter === "active") {
      filteredTodos = todos.filter(todo => todo.is_completed !== true);
    } else if (this.state.filter === "completed") {
      filteredTodos = todos.filter(todo => todo.is_completed === true);
    }

    const todoList: any = [];
    filteredTodos.forEach((todo, index) => {
      todoList.push(
        <TodoItem key={index} index={index.toString()} todo={todo} />
      );
    });

    return (
      <Fragment>
        <div className="todoListWrapper">
          <ul>{todoList}</ul>
        </div>

        <TodoFilters
          todos={filteredTodos}
          currentFilter={this.state.filter}
          filterResultsFn={this.filterResults}
          clearCompletedFn={this.clearCompleted}
          clearInProgress={this.state.clearInProgress}
        />
      </Fragment>
    );
  }
}

const TodoPrivateListQuery: React.FC = () => (
  <Query<getMyTodos> query={GET_MY_TODOS}>
    {({ loading, error, data, client }) => {
      if (loading) {
        return <div>Loading...</div>;
      }
      if (error) {
        console.error(error);
        return <div>Error!</div>;
      }
      if (data) {
        return <TodoPrivateList client={client} todos={data.todos} />;
        // console.log("data", data);
        // return (
        //   <Fragment>
        //     <h1>ToDos</h1>
        //     <code>
        //       <pre>{JSON.stringify(data, null, 2)}</pre>
        //     </code>
        //   </Fragment>
        // );
      }
      return <Fragment />;
    }}
  </Query>
);

export default TodoPrivateListQuery;
