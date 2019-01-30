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
            <div className='o-grid__cell u-1/1'>
              <div className='c-no-results'>
                <img className='c-no-results__img' src={require("../../../images/message-no-playlists-yet.svg")} />
                <p>Create and publish your first playlist! Get started by <br />clicking "create playlist" button from the header.</p>
              </div>
            </div>
          )}
          playlists={playlists.data.filter(item => item.status === 'published')}
        />
      </div>
    );
  }
}

export default MyPlaylistsPublished;
