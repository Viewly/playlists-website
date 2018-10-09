import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import Layout from "./layout";
import PlaylistInfo from "./components/info";

import { playlistFetch } from "../../actions";

@connect(null, (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId }))
}))
class PlaylistPage extends Component {
  componentDidMount () {
    const { playlistFetch, match: { params: { playlistId } } } = this.props;

    playlistFetch(playlistId);
  }
  render() {
    return (
      <Layout>
        <Route path='/playlist/:playlistId' component={PlaylistInfo}></Route>
      </Layout>
    )
  }
}
export default PlaylistPage;
