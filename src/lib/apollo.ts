import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api-sa-east-1.graphcms.com/v2/cl4o305bq0a8j01z77d8heno0/master",
  cache: new InMemoryCache(),
});
