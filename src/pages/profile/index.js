import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { playlistsFetch } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query })),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`alias=${params.profileId}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class ProfilePage extends Component {
  static propTypes = {
    playlistsFetch: PropTypes.func.isRequired,
    playlists: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
  }

  componentDidMount() {
    const { playlistsFetch, match: { params: { profileId } } } = this.props;

    playlistsFetch(`alias=${profileId}`);
  }

  render() {
    const { playlists, match: { params: { profileId } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>All playlists by {profileId}</h1>

        <Playlist
          isLoaded={isReady}
          playlists={playlists.data.filter(i => i.user.alias === profileId)}
        />
      </div>
    );
  }
}
export default ProfilePage;
