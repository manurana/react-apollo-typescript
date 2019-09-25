/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: clearCompleted
// ====================================================

export interface clearCompleted_delete_todos {
  __typename: "todos_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface clearCompleted {
  /**
   * delete data from the table: "todos"
   */
  delete_todos: clearCompleted_delete_todos | null;
}
