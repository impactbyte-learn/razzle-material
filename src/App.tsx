import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Helmet from "react-helmet";
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
      <Fragment>
        <Helmet>
          <title>Change title</title>
          <meta name="description" content="Todos on steroid!" />
          <meta name="theme-color" content="#008f68" />
        </Helmet>
        <Switch>
          <Route exact={true} path="/" component={Home} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
