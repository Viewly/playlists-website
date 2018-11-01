import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../home/components/playlist";
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
class ProfilePage extends Component {
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
    const { playlists, match: { params: { profileId }} } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>All playlists by {profileId}</h1>

        <Playlist title="" isLoaded={isReady} data={playlists.data.filter(i => i.user_id === profileId)} onPlaylistClick={this.onPlaylistClick} />
      </div>
    );
  }
}
export default ProfilePage;
