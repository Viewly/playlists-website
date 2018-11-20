import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { withRouter } from "react-router";
import HeaderContainer from "./components/HeaderContainer";
import { routes } from "./routes";
// import Cookies from "universal-cookie";
import { FirstLoadEvent } from "./analytics";
import AnalyticsWrapper from "./components/Analytics";

@withRouter
class App extends Component {
  constructor(props) {
    super(props);

    // const cookies = new Cookies();
    // cookies.set("ssr", "1", { path: "/" });

    FirstLoadEvent();
  }

  render() {
    // {/* <Route key={`dummy-route-${idx}`} {...route} component={AnalyticsWrapper} /> */}
    return (
      <>
        <Switch>
          {routes.map((route, idx) => (
            <Route key={`dummy-route-${idx}`} path={route.path} exact={route.exact} render={() => <AnalyticsWrapper path={route.path} {...route} />} />
          ))}
        </Switch>

        <Switch>
          {routes.filter(item => item.fullscreen).map((route, idx) => (
            <Route key={`fullscreen-route-${idx}`} {...route} />
          ))}
          <Route component={LayoutWithHeader} />
        </Switch>
      </>
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
