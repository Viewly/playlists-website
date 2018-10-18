import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import Layout from "./layout";
import PlaylistInfo from "./components/info";
import PlaylistSuggest from "./components/suggest";

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
        <Route exact path='/playlist/:playlistId' component={PlaylistInfo}></Route>
        <Route path='/playlist/:playlistId/suggest' component={PlaylistSuggest}></Route>
      </Layout>
    )
  }
}
export default PlaylistPage;
