import React, { Component } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName } from "jss";
import { JssProvider } from "react-jss";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { preloadReady } from "react-loadable";

import App from "./App";

const theme = createMuiTheme({ typography: { useNextVariants: true } });
const generateClassName = createGenerateClassName();

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000" }),
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

function render(Root: any) {
  preloadReady().then(() => {
    hydrate(
      <ApolloProvider client={client}>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <BrowserRouter>
              <Root />
            </BrowserRouter>
          </MuiThemeProvider>
        </JssProvider>
      </ApolloProvider>,
      document.getElementById("root"),
    );
  });
}

(window as any).main = () => {
  render(App);
};

if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    render(NewApp);
  });
}
