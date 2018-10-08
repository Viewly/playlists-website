import React, { Component} from "react";
import { Route } from 'react-router-dom';
import { hot } from "react-hot-loader";

import Layout from './pages/layout';
// import Form from './components/container/FormContainer';
import HomePage from './pages/home';

class App extends Component {
  render() {
    return(
      <Layout>
        {/* <Route path='/' component={Form} /> */}
        <Route path='/' component={HomePage} />
      </Layout>
    );
  }
}

export default hot(module)(App);
