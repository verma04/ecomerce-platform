import { onError } from "@apollo/client/link/error";
import withApollo from "next-with-apollo";

import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";

import { ApolloLink, split } from "apollo-link";

import { getMainDefinition } from "apollo-utilities";
import { createUploadLink } from "apollo-upload-client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = createUploadLink({
  uri: "http://localhost:3002/",
});

const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:4000",
        })
      )
    : null;

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const def = getMainDefinition(query);
          return (
            def.kind === "OperationDefinition" &&
            def.operation === "subscription"
          );
        },
        //@ts-ignore
        wsLink,
        httpLink
      )
    : httpLink;

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("key"),
    },
  });

  return forward(operation);
});

export default withApollo(
  ({ initialState }: any) => {
    return new ApolloClient({
      //@ts-ignore
      link: ApolloLink.from([authMiddleware, link]),
      onError: ({ graphQLErrors, networkError, operation, forward }: any) => {
        console.log("sds");
      },

      cache: new InMemoryCache(),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
