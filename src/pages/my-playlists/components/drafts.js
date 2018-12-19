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
      <div className=''>

        <Playlist
          isLoaded={isReady}
          customClickHandler={this.onPlaylistClick}
          customEmptyContainer={(
            <div className='o-grid__cell u-1/1'>
              <div className='c-no-results'>
                <img className='c-no-results__img' src={require("../../../images/message-no-playlists-yet.svg")} />
                <p>Not ready to publish your playlist yet? <br />Save it to drafts first.</p>
              </div>
            </div>
          )}
          playlists={playlists.data.filter(item => item.status !== 'published')}
        />
      </div>
    );
  }
}

export default MyPlaylistsDrafts;
