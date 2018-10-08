import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Layout from "./layout";
import PlaylistInfo from "./components/info";

class PlaylistPage extends Component {
  render() {
    return (
      <Layout>
        <Route path='/playlist/:playlistId' component={PlaylistInfo}></Route>
      </Layout>
    )
  }
}
export default PlaylistPage;
