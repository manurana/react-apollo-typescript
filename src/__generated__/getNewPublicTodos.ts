/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getNewPublicTodos
// ====================================================

export interface getNewPublicTodos_todos_user {
  __typename: "users";
  name: string;
}

export interface getNewPublicTodos_todos {
  __typename: "todos";
  id: number;
  title: string;
  created_at: any;
  is_completed: boolean;
  /**
   * An object relationship
   */
  user: getNewPublicTodos_todos_user;
}

export interface getNewPublicTodos {
  /**
   * fetch data from the table: "todos"
   */
  todos: getNewPublicTodos_todos[];
}

export interface getNewPublicTodosVariables {
  latestVisibleId: number;
}
