/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: getOnlineUsers
// ====================================================

export interface getOnlineUsers_online_users_user {
  __typename: "users";
  name: string;
}

export interface getOnlineUsers_online_users {
  __typename: "online_users";
  id: string | null;
  /**
   * An object relationship
   */
  user: getOnlineUsers_online_users_user | null;
}

export interface getOnlineUsers {
  /**
   * fetch data from the table: "online_users"
   */
  online_users: getOnlineUsers_online_users[];
}
