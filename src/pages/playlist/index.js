import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import PlaylistInfo from "./components/info";
import PlaylistLayout from "./layout";
import PlaylistSuggest from "./components/suggest";
import PlaylistComments from "./components/comments";

import { asyncLoad } from "../../utils";
import { playlistFetch } from "../../actions";
import { playlistViews } from "../../actions/playlist";

const prepareActions = (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
  playlistViews: (playlistId) => dispatch(playlistViews({ playlistId }))
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistFetch } = prepareActions(store.dispatch);

  await playlistFetch(params.playlistId);
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

  componentDidMount() {
    const { playlist, playlistFetch, playlistViews, match: { params: { playlistId } } } = this.props;

    if (!playlist.isServerRendered || (playlist.url !== playlistId)) {
      playlistFetch(playlistId);
      playlistViews(playlistId);
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
