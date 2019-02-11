import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { playlistsFetchNew, playlistsFetchWatchHistory } from "../../actions/playlist";
import { isLoaded, asyncLoad, isPending } from "../../utils";
import { FEED_PAGE } from "../../constants/pages";
import NewPlaylists from "./components/new";

import SEO from "../../components/SEO";
import { Redirect } from "react-router-dom";
import WatchHistory from "./components/watch_history";

const prepareActions = (dispatch) => ({
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  playlistsFetchWatchHistory: (params) => dispatch(playlistsFetchWatchHistory(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: FEED_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: FEED_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchNew, playlistsFetchWatchHistory, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchWatchHistory({ page: 0, limit: 12 });
  await playlistsFetchNew({ page: 0, limit: 12 });
  setServerRendered();
})
@connect((state) => ({
  playlists_new: state.playlists_new,
  playlists_watch_history: state.playlists_watch_history,
  isSSR: !!state.renderedPages[FEED_PAGE],
  user: state.user
}), prepareActions)
export default class FeedPage extends Component {
  static propTypes = {
    playlistsFetchNew: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  async componentDidMount() {
    const { playlists_new, playlists_watch_history, playlistsFetchNew, playlistsFetchWatchHistory, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      isPending(playlists_new) && playlistsFetchNew({ page: 0, limit: 12 });
      isPending(playlists_watch_history) && playlistsFetchWatchHistory({ page: 0, limit: 12 });
    } else {
      setClientRendered();
    }
  }


  render() {
    const { user, playlists_watch_history } = this.props;

    if (!user) {
      return <Redirect to='/feed/create' />;
    }

    return (
      <>
        <SEO />

        {playlists_watch_history.data.length > 0 && (
          <div className="c-section c-section--grey">
            <div className='o-wrapper'>
              <WatchHistory />
            </div>
          </div>
        )}
        <div className='o-wrapper u-padding-top-large u-padding-top-huge@large'>
          <NewPlaylists />
        </div>
      </>
    );
  }
}
