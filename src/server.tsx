import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { SheetsRegistry, createGenerateClassName } from "jss";
import { JssProvider } from "react-jss";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider, getDataFromTree } from "react-apollo";
import { Capture } from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import fetch from "node-fetch";
import stats from "../build/react-loadable.json";

import App from "./App";

let assets: any;

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get("/*", async (req: express.Request, res: express.Response) => {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();
    const theme = createMuiTheme({ typography: { useNextVariants: true } });
    const generateClassName = createGenerateClassName();

    const client = new ApolloClient({
      link: new HttpLink({ uri: "http://localhost:4000", fetch: fetch as any }),
      cache: new InMemoryCache(),
      ssrMode: true,
    });

    const context: any = {};
    const modules: string[] = [];

    const RenderApp = (
      <Capture report={(moduleName) => modules.push(moduleName)}>
        <ApolloProvider client={client}>
          <JssProvider
            registry={sheetsRegistry}
            generateClassName={generateClassName}
          >
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <StaticRouter context={context} location={req.url}>
                <App />
              </StaticRouter>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Capture>
    );
    await getDataFromTree(RenderApp);
    const markup = renderToString(RenderApp);
    const state = client.cache.extract();
    const css = sheetsRegistry.toString();

    if (context.url) {
      res.redirect(context.url);
    } else {
      const bundles = getBundles(stats, modules);
      const chunks = bundles.filter((bundle) => bundle.file.endsWith(".js"));
      const styles = bundles.filter((bundle) => bundle.file.endsWith(".css"));
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
          ${styles
            .map((style) => `<link href="${style.file}" rel="stylesheet"/>`)
            .join("\n")}
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${markup}</div>
          <script>window.__APOLLO_STATE__=${JSON.stringify(state)}</script>
          <style id="jss-server-side">${css}</style>
          ${chunks
            .map(
              (chunk) =>
                process.env.NODE_ENV === "production"
                  ? `<script src="/${chunk.file}"></script>`
                  : `<script src="http://${process.env.HOST}:${parseInt(
                      process.env.PORT as string,
                      10,
                    ) + 1}/${chunk.file}"></script>`,
            )
            .join("\n")}
          <script>window.main();</script>
      </body>
  </html>`,
      );
    }
  });

export default server;
