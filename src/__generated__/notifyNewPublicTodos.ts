/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: notifyNewPublicTodos
// ====================================================

export interface notifyNewPublicTodos_todos {
  __typename: "todos";
  id: number;
  created_at: any;
}

export interface notifyNewPublicTodos {
  /**
   * fetch data from the table: "todos"
   */
  todos: notifyNewPublicTodos_todos[];
}
