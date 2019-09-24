import React, { Component, Fragment } from "react";

import TodoItem from "./TodoItem";
import TodoFilters from "./TodoFilters";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { getMyTodos, getMyTodos_todos } from "../../__generated__/getMyTodos";
import ApolloClient from "apollo-client";

const GET_MY_TODOS = gql`
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
  // client: ApolloClient;
  todos: getMyTodos_todos[];
}

interface MyState {
  filter: filter;
  clearInProgress: boolean;
}

class TodoPrivateList extends Component<MyProps, MyState> {
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

  clearCompleted = () => {};

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
        return <TodoPrivateList todos={data.todos} />;
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
