import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query })),
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`user_id=${params.profileId}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class ProfilePage extends Component {
  componentDidMount() {
    const { playlistsFetch, match: { params: { profileId } } } = this.props;

    playlistsFetch(`user_id=${profileId}`);
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.data.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
  }

  render() {
    const { playlists, match: { params: { profileId } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>All playlists by {profileId}</h1>

        <Playlist
          isLoaded={isReady}
          playlists={playlists.data.filter(i => i.user_id === profileId)}
        />
      </div>
    );
  }
}
export default ProfilePage;
