import React from "react";

import Header from "./components/Header";
import TodoPrivateWrapper from "./components/Todo/TodoPrivateWrapper";
import TodoPublicWrapper from "./components/Todo/TodoPublicWrapper";
import OnlineUsersWrapper from "./components/OnlineUsers/OnlineUsersWrapper";

import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { ApolloProvider } from "react-apollo";

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new WebSocketLink({
      uri: "wss://learn.hasura.io/graphql",
      options: {
        reconnect: true,
        connectionParams: {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      }
    }),
    cache: new InMemoryCache()
  });
};

const App = ({ auth }: any) => {
  const client = createApolloClient(auth.idToken);
  return (
    <ApolloProvider client={client}>
      <div>
        <Header logoutHandler={auth.logout} />
        <div className="container-fluid p-left-right-0">
          <div className="col-xs-12 col-md-9 p-left-right-0">
            <div className="col-xs-12 col-md-6 sliderMenu p-30">
              <TodoPrivateWrapper />
            </div>
            <div className="col-xs-12 col-md-6 sliderMenu p-30 bg-gray border-right">
              <TodoPublicWrapper />
            </div>
          </div>
          <div className="col-xs-12 col-md-3 p-left-right-0">
            <div className="col-xs-12 col-md-12 sliderMenu p-30 bg-gray">
              <OnlineUsersWrapper />
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
