"use strict";
const { ReactLoadablePlugin } = require("react-loadable/webpack");

module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: true,
      },
    },
  ],
  modify: (config, { target }) => {
    if (target === "web") {
      return {
        ...config,
        plugins: [
          ...config.plugins,
          new ReactLoadablePlugin({
            filename: "./build/react-loadable.json",
          }),
        ],
      };
    }

    return config;
  },
};
