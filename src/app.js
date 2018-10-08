import React, { Component} from "react";
import { Route } from 'react-router-dom';
import { hot } from "react-hot-loader";

import Layout from './pages/layout';

import HomePage from './pages/home';
import PlaylistPage from './pages/playlist';

class App extends Component {
  render() {
    return(
      <Layout>
        <Route exact path='/' component={HomePage} />
        <Route path='/playlist/:playlistId' component={PlaylistPage} />
      </Layout>
    );
  }
}

export default hot(module)(App);
