import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { hot } from "react-hot-loader";

import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';
import NewPlaylist from './pages/new';
import SearchPage from './pages/search';
import HeaderContainer from "./components/HeaderContainer";

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

        <Route exact path='/' component={HomePage} />
        <Route path='/new' component={NewPlaylist} />
        <Route path='/search/' component={SearchPage} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
      </div>
    )
  }
}

export default hot(module)(App);
