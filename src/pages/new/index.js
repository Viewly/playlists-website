import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";

const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch()),
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
  componentDidMount() {
    const { playlistsFetch } = this.props;

    playlistsFetch();
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.data.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
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
        </div>
      </>
    );
  }
}
export default LatestPlaylists;
