import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";

const Home = Loadable({
  loader: () => import("./components/Home"),
  loading: () => null,
});

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
