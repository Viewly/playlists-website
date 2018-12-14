import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isLoaded } from "../../../utils";

import Playlist from "../../../components/PlaylistContainer";

@connect((state) => ({
  playlists: state.playlists
}))
class MyPlaylistsDrafts extends Component {
  static propTypes = {
    playlists: PropTypes.object,
  };

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
        <h1 className='u-h3'>Drafts</h1>

        <Playlist
          isLoaded={isReady}
          customClickHandler={this.onPlaylistClick}
          playlists={playlists.data.filter(item => item.status !== 'published')}
        />
      </div>
    );
  }
}

export default MyPlaylistsDrafts;
