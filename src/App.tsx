import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";

class App extends Component {
  public componentDidMount() {
    const jssStyles = document.getElementById("jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Home} />
      </Switch>
    );
  }
}

export default App;
