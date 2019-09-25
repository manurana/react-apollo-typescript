/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: removeTodo
// ====================================================

export interface removeTodo_delete_todos {
  __typename: "todos_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface removeTodo {
  /**
   * delete data from the table: "todos"
   */
  delete_todos: removeTodo_delete_todos | null;
}

export interface removeTodoVariables {
  id: number;
}
