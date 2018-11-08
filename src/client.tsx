import React, { Component } from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { createGenerateClassName } from "jss";

import App from "./App";
import { JssProvider } from "react-jss";

class Main extends Component {
  public componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    return <App />;
  }
}

const theme = createMuiTheme();
const generateClassName = createGenerateClassName();

hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById("root"),
);

if (module.hot) {
  module.hot.accept();
}
