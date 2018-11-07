import React, { Component } from "react";
import { connect } from "react-redux";
import VisibilitySensor from "react-visibility-sensor";

import { playlistsFetch, playlistsLoadMore, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";

const LIMIT = 12;

const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch({ page: 0, limit: LIMIT })),
  playlistsLoadMore: (page, limit) => dispatch(playlistsLoadMore({ page, limit })),
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch();
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class LatestPlaylists extends Component {
  state = {
    page: 0,
    hasMore: true
  }

  componentDidMount() {
    const { playlistsFetch } = this.props;

    playlistsFetch();
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
    })
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
            playlists={playlists.data.filter(i => i.classification !== 'staff_picked')}
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
