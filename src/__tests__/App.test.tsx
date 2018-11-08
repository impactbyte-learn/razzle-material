import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { MemoryRouter } from "react-router-dom";
import { JssProvider, createGenerateClassName } from "react-jss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import App from "../App";

describe("<App />", () => {
  test("renders without exploding", () => {
    const theme = createMuiTheme({ typography: { useNextVariants: true } });
    const generateClassName = createGenerateClassName();

    const div = document.createElement("div");
    render(
      <JssProvider generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </MuiThemeProvider>
      </JssProvider>,
      div,
    );
    unmountComponentAtNode(div);
  });
});
