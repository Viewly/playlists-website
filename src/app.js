import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import HeaderContainer from "./components/HeaderContainer";
import { routes } from "./routes";
import Cookies from "universal-cookie";

class App extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();
    cookies.set("ssr", "1", { path: "/" });
  }

  render() {
    return (
      <Switch>
        {routes.filter(item => item.fullscreen).map((route, idx) => (
          <Route key={`fullscreen-route-${idx}`} {...route} />
        ))}
        <Route component={LayoutWithHeader} />
      </Switch>
    );
  }
}

class LayoutWithHeader extends Component {
  render() {
    return (
      <div className='has-header'>
        <HeaderContainer />
        <>
          {routes.map((route, idx) => (
            <Route key={`route-${idx}`} {...route} />
          ))}
        </>
      </div>
    );
  }
}

export default hot(module)(App);
