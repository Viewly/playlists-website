import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMyPlaylists } from "../../actions/user";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";

const prepareActions = (dispatch) => ({
  fetchMyPlaylists: () => dispatch(fetchMyPlaylists()),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { fetchMyPlaylists } = prepareActions(store.dispatch);

  await fetchMyPlaylists();
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class MyPlaylistsPage extends Component {
  static propTypes = {
    fetchMyPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.object,
  };

  componentDidMount() {
    const { fetchMyPlaylists } = this.props;

    fetchMyPlaylists();
  }

  onPlaylistClick = (evnt, playlist) => {
    const { history } = this.props;

    evnt && evnt.preventDefault();
    history.push(`/create-playlist/${playlist.id}`);
  };

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>My playlists</h1>

        <Playlist
          isLoaded={isReady}
          customClickHandler={this.onPlaylistClick}
          playlists={playlists.data}
        />
      </div>
    );
  }
}

export default MyPlaylistsPage;
