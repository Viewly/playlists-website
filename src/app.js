import React, { Component} from "react";
import { Route, Switch } from 'react-router-dom';
import { hot } from "react-hot-loader";

import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';
import PlayerPage from './pages/player';

import _style from "./styles/global.scss";

class App extends Component {
  render() {
    return(
      <>
        <Route exact path='/' component={HomePage} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
        <Route path='/player/:playlistId/:videoId' component={PlayerPage} />
      </>
    );
  }
}

export default hot(module)(App);
