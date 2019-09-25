import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { withApollo, WithApolloClient, Subscription } from "react-apollo";

import OnlineUser from "./OnlineUser";

import { getOnlineUsers } from "../../__generated__/getOnlineUsers";

class OnlineUsersWrapper extends Component<WithApolloClient<{}>> {
  // https://stackoverflow.com/a/50428377
  onlineIndicator = 0;

  componentDidMount() {
    // Every 30s, run a mutation to tell the backend that you're online
    this.onlineIndicator = window.setInterval(
      () => this.updateLastSeen(),
      30000
    );
  }

  updateLastSeen = () => {
    // Use the apollo client to run a mutation to update the last_seen value
    const UPDATE_LASTSEEN_MUTATION = gql`
      mutation updateLastSeen($now: timestamptz!) {
        update_users(where: {}, _set: { last_seen: $now }) {
          affected_rows
        }
      }
    `;
    this.props.client.mutate({
      mutation: UPDATE_LASTSEEN_MUTATION,
      variables: { now: new Date().toISOString() }
    });
  };

  render() {
    const GET_ONLINE_USERS = gql`
      subscription getOnlineUsers {
        online_users(order_by: { user: { name: asc } }) {
          id
          user {
            name
          }
        }
      }
    `;

    return (
      <div className="onlineUsersWrapper">
        <Subscription<getOnlineUsers> subscription={GET_ONLINE_USERS}>
          {({ loading, error, data }) => {
            if (loading) {
              return <span>Loading...</span>;
            }
            if (error) {
              console.error(error);
              return <span>Error!</span>;
            }
            if (data) {
              const users = data.online_users;
              // FIXME: remove any
              const onlineUsersList: any = [];
              users.forEach((u, index) => {
                if (u.user) {
                  onlineUsersList.push(
                    <OnlineUser key={index} index={index} user={u.user} />
                  );
                }
              });
              return (
                <Fragment>
                  <div className="sliderHeader">
                    Online users - {users.length}
                  </div>
                  {onlineUsersList}
                </Fragment>
              );
            }
            return (
              <Fragment>
                <div className="sliderHeader">Online users</div>
              </Fragment>
            );
          }}
        </Subscription>
      </div>
    );
  }
}

export default withApollo(OnlineUsersWrapper);
