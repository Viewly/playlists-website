import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { isLoaded } from "../../../utils";

import Playlist from "../../../components/PlaylistContainer";

@connect((state) => ({
  playlists: state.playlists
}))
class MyPlaylistsPublished extends Component {
  static propTypes = {
    playlists: PropTypes.object,
  };

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className=''>

        <Playlist
          isLoaded={isReady}
          customEmptyContainer={(
            <div>No published playlists</div>
          )}
          playlists={playlists.data.filter(item => item.status === 'published')}
        />
      </div>
    );
  }
}

export default MyPlaylistsPublished;
