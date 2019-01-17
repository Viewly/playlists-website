import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { asyncLoad, isPending, isLoading } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";
import { NEW_PAGE } from "../../constants/pages";
import { playlistsFetchNew } from "../../actions/playlist";

const LIMIT = 12;

const prepareActions = (dispatch) => ({
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: NEW_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: NEW_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchNew, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchNew({ page: 0, limit: 12 });
  setServerRendered();
})
@connect((state) => ({
  playlists: state.playlists_new,
  isSSR: !!state.renderedPages[NEW_PAGE]
}), prepareActions)
class LatestPlaylists extends Component {
  static propTypes = {
    playlistsFetchNew: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  state = {
    page: 0,
    hasMore: true
  }

  componentDidMount() {
    const { playlists, playlistsFetchNew, setClientRendered, isSSR } = this.props;

    if (!isSSR) {
      isPending(playlists) && playlistsFetchNew({ page: 0, limit: 12 });
    } else {
      setClientRendered();
    }
  }

  loadMore = async (visible) => {
    const { playlistsFetchNew } = this.props;

    if (visible === false) {
      return;
    }

    this.setState({ page: this.state.page + 1 }, async () => {
      const playlists = await playlistsFetchNew({ page: this.state.page, limit: LIMIT });
      if (playlists.length < LIMIT) {
        this.setState({ hasMore: false });
      }
    });
  }

  render() {
    const { playlists } = this.props;
    const isReady = !isPending(playlists);

    return (
      <>
        <SEO title="New playlists" />

        <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
          <Playlist
            isLoaded={isReady}
            title="New playlists"
            playlists={playlists?.data.slice(0, LIMIT * (this.state.page + 1))}
          />

          {!isLoading(playlists) && playlists.data.length > 0 && this.state.hasMore && (
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
