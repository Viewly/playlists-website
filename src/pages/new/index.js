import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";

import { playlistsFetch, playlistsLoadMore, SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";
import { NEW_PAGE } from "../../constants/pages";

const LIMIT = 12;

const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch({ page: 0, limit: LIMIT })),
  playlistsLoadMore: (page, limit) => dispatch(playlistsLoadMore({ page, limit })),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: NEW_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: NEW_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetch();
  setServerRendered();
})
@connect((state) => ({
  playlists: state.playlists,
  isSSR: !!state.renderedPages[NEW_PAGE]
}), prepareActions)
class LatestPlaylists extends Component {
  static propTypes = {
    playlistsFetch: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  state = {
    page: 0,
    hasMore: true
  }

  componentDidMount() {
    const { playlistsFetch, setClientRendered, isSSR } = this.props;

    if (!isSSR) {
      playlistsFetch();
    } else {
      setClientRendered();
    }
  }

  loadMore = async (visible) => {
    const { playlistsLoadMore } = this.props;

    if (visible === false) {
      return;
    }

    this.setState({ page: this.state.page + 1 }, async () => {
      const playlists = await playlistsLoadMore(this.state.page, LIMIT);
      if (playlists.length < LIMIT) {
        this.setState({ hasMore: false });
      }
    });
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <>
        <SEO title="New playlists" />

        <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
          <Playlist
            isLoaded={isReady}
            title="New playlists"
            playlists={playlists.data}
          />

          {isReady && this.state.hasMore && (
            <VisibilitySensor partialVisibility offset={{ bottom: -200 }} onChange={this.loadMore}>
              <div className='u-text-center'>
                <button className='c-btn c-btn--secondary c-btn--small' onClick={this.loadMore}>Load more</button>
              </div>
            </VisibilitySensor>
          )}
        </div>
      </>
    );
  }
}
export default LatestPlaylists;
