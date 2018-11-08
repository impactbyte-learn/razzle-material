import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { SheetsRegistry, createGenerateClassName } from "jss";
import { JssProvider } from "react-jss";

import App from "./App";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", (req: express.Request, res: express.Response) => {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = createMuiTheme({ typography: { useNextVariants: true } });
    const generateClassName = createGenerateClassName();

    const context = {};
    const markup = renderToString(
      <JssProvider
        registry={sheetsRegistry}
        generateClassName={generateClassName}
      >
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <StaticRouter context={context} location={req.url}>
            <App />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>,
    );
    const css = sheetsRegistry.toString();
    res.send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${
          assets.client.css
            ? `<link rel="stylesheet" href="${assets.client.css}">`
            : ""
        }
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
    </head>
    <body>
        <div id="root">${markup}</div>
        <style id="jss-server-side">${css}</style>
    </body>
</html>`,
    );
  });

export default server;
