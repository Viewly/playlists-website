import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import PlayerPage from "./pages/player";
import HeaderContainer from "./components/HeaderContainer";
import { routes } from "./routes";
// import Cookies from "universal-cookie";
import { FirstLoadEvent } from "./analytics";

class App extends Component {
  constructor(props) {
    super(props);

    // const cookies = new Cookies();
    // cookies.set("ssr", "1", { path: "/" });

    FirstLoadEvent();
  }

  render() {
    return (
      <Switch>
        <Route path='/player/:playlistId/:videoId' component={PlayerPage} />
        <Route component={LayoutWithHeader} />
      </Switch>
    );
  }
}

class LayoutWithHeader extends Component {
  render() {
    return (
      <div>
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
