import React, { Component } from "react";
import { connect } from "react-redux";
import { Route } from 'react-router-dom';
import PlaylistInfo from "./components/info";
import PlaylistSuggest from "./components/suggest";

import { asyncLoad } from "../../utils";
import { playlistFetch } from "../../actions";

const prepareActions = (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId }))
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistFetch } = prepareActions(store.dispatch);

  await playlistFetch(params.playlistId);
})
@connect((state) => ({
  playlist: state.playlist
}), prepareActions)
class PlaylistPage extends Component {
  componentDidMount () {
    const { playlist, playlistFetch, match: { params: { playlistId } } } = this.props;

    if (!playlist.isServerRendered || (playlist.url !== playlistId)) {
      playlistFetch(playlistId);
    }
  }
  render() {
    return (
      <>
        <Route exact path='/playlist/:playlistId' component={PlaylistInfo}></Route>
        <Route path='/playlist/:playlistId/suggest' component={PlaylistSuggest}></Route>
      </>
    )
  }
}
export default PlaylistPage;
