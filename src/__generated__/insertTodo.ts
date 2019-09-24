/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: insertTodo
// ====================================================

export interface insertTodo_insert_todos_returning {
  __typename: "todos";
  id: number;
  title: string;
  created_at: any;
  is_completed: boolean;
}

export interface insertTodo_insert_todos {
  __typename: "todos_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
  /**
   * data of the affected rows by the mutation
   */
  returning: insertTodo_insert_todos_returning[];
}

export interface insertTodo {
  /**
   * insert data into the table: "todos"
   */
  insert_todos: insertTodo_insert_todos | null;
}

export interface insertTodoVariables {
  todo: string;
  isPublic: boolean;
}
