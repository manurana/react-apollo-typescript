/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getOldPublicTodos
// ====================================================

export interface getOldPublicTodos_todos_user {
  __typename: "users";
  name: string;
}

export interface getOldPublicTodos_todos {
  __typename: "todos";
  id: number;
  title: string;
  created_at: any;
  is_completed: boolean;
  /**
   * An object relationship
   */
  user: getOldPublicTodos_todos_user;
}

export interface getOldPublicTodos {
  /**
   * fetch data from the table: "todos"
   */
  todos: getOldPublicTodos_todos[];
}

export interface getOldPublicTodosVariables {
  oldestTodoId: number;
}
