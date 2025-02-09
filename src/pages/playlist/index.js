import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PlaylistInfo from "./components/info";
import PlaylistLayout from "./layout";
import PlaylistSuggest from "./components/suggest";
import PlaylistComments from "./components/comments";

import { asyncLoad } from "../../utils";
import { PLAYLIST_INJECT_WATCH_TIME, playlistFetch } from "../../actions";
import { playlistFetchProgresses, playlistViews } from "../../actions/playlist";

const prepareActions = (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
  playlistViews: (playlistId) => dispatch(playlistViews({ playlistId })),
  playlistFetchProgresses: (playlistId) => dispatch(playlistFetchProgresses({ playlistId })),
  updateWatchTime: () => dispatch({ type: PLAYLIST_INJECT_WATCH_TIME })
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistFetch, playlistFetchProgresses } = prepareActions(store.dispatch);

  await playlistFetch(params.playlistId);
  await playlistFetchProgresses(params.playlistId);
})
@connect((state) => ({
  playlist: state.playlist
}), prepareActions)
class PlaylistPage extends Component {
  static propTypes = {
    playlistFetch: PropTypes.func.isRequired,
    playlist: PropTypes.object,
    match: PropTypes.object,
  };

  async componentDidMount() {
    const { playlist, updateWatchTime, playlistFetch, playlistViews, playlistFetchProgresses, match: { params: { playlistId } } } = this.props;

    if (!playlist.isServerRendered || (playlist.url !== playlistId)) {
      await playlistFetch(playlistId);
      playlistFetchProgresses(playlistId);
      playlistViews(playlistId);
    } else if (playlist.isServerRendered) {
      // updateWatchTime();
      playlistFetchProgresses(playlistId);
    }
  }

  render() {
    return (
      <Switch>
        <Route path='/playlist/:playlistId/suggest' component={PlaylistSuggest}/>
        <Route path='/playlist/:playlistId' component={PlaylistLayout}/>
      </Switch>
    );
  }
}

export default PlaylistPage;
