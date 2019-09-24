import React, { Component, Fragment } from "react";

// import TodoItem from "./TodoItem";
// import TodoFilters from "./TodoFilters";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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

class TodoPrivateList extends Component {
  state = {
    filter: "all",
    clearInProgress: false,
    todos: [
      {
        id: "1",
        title: "This is private todo 1",
        is_completed: true,
        is_public: false
      },
      {
        id: "2",
        title: "This is private todo 2",
        is_completed: false,
        is_public: false
      }
    ]
  };

  // filterResults = filter => {
  //   this.setState({
  //     ...this.state,
  //     filter: filter
  //   });
  // };

  // clearCompleted = () => {};

  render() {
    let filteredTodos = this.state.todos;
    if (this.state.filter === "active") {
      filteredTodos = this.state.todos.filter(
        todo => todo.is_completed !== true
      );
    } else if (this.state.filter === "completed") {
      filteredTodos = this.state.todos.filter(
        todo => todo.is_completed === true
      );
    }

    // const todoList = [];
    // filteredTodos.forEach((todo, index) => {
    //   todoList.push(<div>todo.title</div>);
    // });

    return (
      <Fragment>
        {/* <div className="todoListWrapper">
          <ul>{todoList}</ul>
        </div> */}

        {/* <TodoFilters
          todos={filteredTodos}
          currentFilter={this.state.filter}
          filterResultsFn={this.filterResults}
          clearCompletedFn={this.clearCompleted}
          clearInProgress={this.state.clearInProgress}
        /> */}
      </Fragment>
    );
  }
}

const TodoPrivateListQuery = () => {
  return (
    <Query query={GET_MY_TODOS}>
      {({ loading, error, data, client }) => {
        if (loading) {
          return <div>Loading...</div>;
        }
        if (error) {
          console.error(error);
          return <div>Error!</div>;
        }
        return <TodoPrivateList client={client} todos={data.todos} />;
      }}
    </Query>
  );
};

export default TodoPrivateList;
