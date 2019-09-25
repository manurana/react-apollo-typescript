/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateLastSeen
// ====================================================

export interface updateLastSeen_update_users {
  __typename: "users_mutation_response";
  /**
   * number of affected rows by the mutation
   */
  affected_rows: number;
}

export interface updateLastSeen {
  /**
   * update data of the table: "users"
   */
  update_users: updateLastSeen_update_users | null;
}

export interface updateLastSeenVariables {
  now: any;
}
