/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleTodo
// ====================================================

export interface toggleTodo_update_todos {
  __typename: "todos_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface toggleTodo {
  /**
   * update data of the table: "todos"
   */
  update_todos: toggleTodo_update_todos | null;
}

export interface toggleTodoVariables {
  id: number;
  isCompleted: boolean;
}
