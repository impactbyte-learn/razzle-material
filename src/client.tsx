import React, { Component } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName } from "jss";

import App from "./App";
import { JssProvider } from "react-jss";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";

const theme = createMuiTheme({ typography: { useNextVariants: true } });
const generateClassName = createGenerateClassName();

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

hydrate(
  <ApolloProvider client={client}>
    <JssProvider generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </JssProvider>
  </ApolloProvider>,
  document.getElementById("root"),
);

if (module.hot) {
  module.hot.accept();
}
