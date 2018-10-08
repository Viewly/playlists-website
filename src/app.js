import React, { Component} from "react";
import { Route, Switch } from 'react-router-dom';
import { hot } from "react-hot-loader";

import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';

class App extends Component {
  render() {
    return(
      <React.Fragment>
        <Route exact path='/' component={HomePage} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
        <Route path='/player/:playlistId/:videoId' component={PlayerPage} />
      </React.Fragment>
    );
  }
}

export default hot(module)(App);
