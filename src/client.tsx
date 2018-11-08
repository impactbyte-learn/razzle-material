import React, { Component } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName } from "jss";

import App from "./App";
import { JssProvider } from "react-jss";

const theme = createMuiTheme({ typography: { useNextVariants: true } });
const generateClassName = createGenerateClassName();

hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById("root"),
);

if (module.hot) {
  module.hot.accept();
}
