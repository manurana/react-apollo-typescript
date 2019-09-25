import React, { Component, Fragment } from "react";
import { Subscription, withApollo, WithApolloClient } from "react-apollo";
import gql from "graphql-tag";
import TaskItem from "./TaskItem";

import {
  notifyNewPublicTodos,
  notifyNewPublicTodos_todos
} from "../../__generated__/notifyNewPublicTodos";

import {
  getNewPublicTodos,
  getNewPublicTodosVariables,
  getNewPublicTodos_todos
} from "../../__generated__/getNewPublicTodos";
import {
  getOldPublicTodos,
  getOldPublicTodosVariables,
  getOldPublicTodos_todos
} from "../../__generated__/getOldPublicTodos";

interface MyProps {
  latestTodo: notifyNewPublicTodos_todos;
}

interface MyState {
  olderTodosAvailable: boolean;
  newTodosCount: number;
  todos: getNewPublicTodos_todos[] | getOldPublicTodos_todos[];
  error: boolean;
}

class TodoPublicListInternal extends Component<
  WithApolloClient<MyProps>,
  MyState
> {
  state = {
    olderTodosAvailable: this.props.latestTodo ? true : false,
    newTodosCount: 0,
    todos: [],
    error: false
  };

  loadNew = () => {
    const GET_NEW_PUBLIC_TODOS = gql`
      query getNewPublicTodos($latestVisibleId: Int!) {
        todos(
          where: { is_public: { _eq: true }, id: { _gt: $latestVisibleId } }
          order_by: { created_at: desc }
        ) {
          id
          title
          created_at
          is_completed
          user {
            name
          }
        }
      }
    `;
    this.props.client
      .query<getNewPublicTodos, getNewPublicTodosVariables>({
        query: GET_NEW_PUBLIC_TODOS,
        variables: {
          // FIXME: this is a wierd type error
          // latestVisibleId: this.state.todos.length ? this.state.todos[0].id : 0
          latestVisibleId: 0
        }
      })
      .then(({ data }) => {
        // should not need this check as this is called only on a subscription
        if (data.todos.length) {
          this.newestTodoId = data.todos[0].id;
          this.setState({
            todos: [...data.todos, ...this.state.todos],
            newTodosCount: 0
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: true });
      });
  };

  loadOlder = () => {
    const GET_OLD_PUBLIC_TODOS = gql`
      query getOldPublicTodos($oldestTodoId: Int!) {
        todos(
          where: { is_public: { _eq: true }, id: { _lt: $oldestTodoId } }
          limit: 7
          order_by: { created_at: desc }
        ) {
          id
          title
          created_at
          is_completed
          user {
            name
          }
        }
      }
    `;
    this.props.client
      .query<getOldPublicTodos, getOldPublicTodosVariables>({
        query: GET_OLD_PUBLIC_TODOS,
        variables: { oldestTodoId: this.oldestTodoId }
      })
      .then(({ data }) => {
        if (data.todos.length) {
          this.oldestTodoId = data.todos[data.todos.length - 1].id;
          this.setState({ todos: [...this.state.todos, ...data.todos] });
        } else {
          this.setState({ olderTodosAvailable: false });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ error: true });
      });
  };

  oldestTodoId: number = this.props.latestTodo.id + 1;
  newestTodoId: number = this.props.latestTodo.id;

  componentDidMount() {
    this.loadOlder();
  }

  componentDidUpdate() {
    // Do we have a new todo available?
    if (this.props.latestTodo.id > this.newestTodoId) {
      this.newestTodoId = this.props.latestTodo.id;
      this.setState({ newTodosCount: this.state.newTodosCount + 1 });
    }
  }

  render() {
    const todos = this.state.todos;

    const todoList = (
      <ul>
        {todos.map((todo, index) => {
          return <TaskItem key={index} index={index} todo={todo} />;
        })}
      </ul>
    );

    let newTodosNotification = <div />;
    if (this.state.newTodosCount) {
      newTodosNotification = (
        <div className={"loadMoreSection"} onClick={this.loadNew}>
          New tasks have arrived! ({this.state.newTodosCount.toString()})
        </div>
      );
    }

    const olderTodosMsg = (
      <div className={"loadMoreSection"} onClick={this.loadOlder}>
        {this.state.olderTodosAvailable
          ? "Load older tasks"
          : "No more public tasks!"}
      </div>
    );

    return (
      <Fragment>
        <div className="todoListWrapper">
          {newTodosNotification}

          {todoList}

          {olderTodosMsg}
        </div>
      </Fragment>
    );
  }
}

const TodoPublicList = withApollo<MyProps>(TodoPublicListInternal);

// Run a subscription to get the latest public todo
const NOTIFY_NEW_PUBLIC_TODOS = gql`
  subscription notifyNewPublicTodos {
    todos(
      where: { is_public: { _eq: true } }
      limit: 1
      order_by: { created_at: desc }
    ) {
      id
      created_at
    }
  }
`;

const TodoPublicListSubscription = () => {
  return (
    <Subscription<notifyNewPublicTodos> subscription={NOTIFY_NEW_PUBLIC_TODOS}>
      {({ loading, error, data }) => {
        if (loading) {
          return <span>Loading...</span>;
        }
        if (error) {
          return <span>Error</span>;
        }
        if (data) {
          return (
            <TodoPublicList
              // why this check ? why should this be null ?
              // this is a subscription, so will get something
              // latestTodo={data.todos.length ? data.todos[0] : null}
              latestTodo={data.todos[0]}
            />
          );
        }
        return <Fragment />;
      }}
    </Subscription>
  );
};

export default TodoPublicListSubscription;
