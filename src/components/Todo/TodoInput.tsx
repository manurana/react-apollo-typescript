import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { GET_MY_TODOS } from "./TodoPrivateList";
import { MutationUpdaterFn } from "apollo-client";

import {
  insertTodo,
  insertTodoVariables
} from "../../__generated__/insertTodo";
import { getMyTodos, getMyTodos_todos } from "../../__generated__/getMyTodos";

const ADD_TODO = gql`
  mutation insertTodo($todo: String!, $isPublic: Boolean!) {
    insert_todos(objects: { title: $todo, is_public: $isPublic }) {
      affected_rows
      returning {
        id
        title
        created_at
        is_completed
      }
    }
  }
`;

const TodoInput = ({ isPublic = false }) => {
  let input: HTMLInputElement | null;
  const [todoInput, setTodoInput] = useState("");

  const updateCache: MutationUpdaterFn = (cache, { data }) => {
    // If this is for the public feed, do nothing
    if (isPublic) {
      return null;
    }
    // Fetch the todos from the cache
    const existingTodos: getMyTodos = cache.readQuery({
      query: GET_MY_TODOS
    }) || { todos: [] };
    // Add the new todo to the cache
    const newTodo =
      data && data.insert_todos && data.insert_todos.returning
        ? data.insert_todos.returning[0]
        : null;
    cache.writeQuery({
      query: GET_MY_TODOS,
      data: { todos: [newTodo, ...existingTodos.todos] }
    });
  };

  const resetInput = () => {
    setTodoInput("");
    if (input) {
      input.focus();
    }
  };

  return (
    <Mutation<insertTodo, insertTodoVariables>
      mutation={ADD_TODO}
      update={updateCache}
      onCompleted={resetInput}
    >
      {(addTodo, { loading, data }) => {
        return (
          <form
            className="formInput"
            onSubmit={e => {
              e.preventDefault();
              addTodo({ variables: { todo: todoInput, isPublic } });
            }}
          >
            <input
              className="input"
              placeholder="What needs to be done?"
              value={todoInput}
              onChange={e => setTodoInput(e.target.value)}
              ref={n => (input = n)}
            />
            <i className="inputMarker fa fa-angle-right" />
          </form>
        );
      }}
    </Mutation>
  );
};

export default TodoInput;
