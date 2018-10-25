import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { hot } from "react-hot-loader";

import { routes } from './routes';

class App extends Component {
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
        {/* <Route exact path='/' component={HomePage} />
        <Route path='/new' component={NewPlaylist} />
        <Route path='/search/' component={SearchPage} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} /> */}
      </div>
    )
  }
}

export default hot(module)(App);
