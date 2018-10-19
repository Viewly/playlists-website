import React, { Component } from "react";
import { Route } from 'react-router-dom';
import { hot } from "react-hot-loader";

import { routes } from './routes';

class App extends Component {
  render() {
    return (
      <>
        {routes.map((route, idx) => (
          <Route key={`route-${idx}`} {...route} />
        ))}
      </>
    );
  }
}

export default hot(module)(App);
