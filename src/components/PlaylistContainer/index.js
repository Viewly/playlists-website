import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { PLAYLIST_INJECT_DATA } from "../../actions";
import PlaylistItem from "./item";
import Loading from "../loading";

@withRouter
@connect(null, (dispatch) => ({
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
}))
export default class Playlist extends Component {
  static defaultProps = {
    noPlaylistsText: "No playlists found",
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
  }

  render() {
    const { isLoaded, playlists, title, noPlaylistsText } = this.props;

    return (
      <div className='u-margin-top-small'>
        {title && <h2>{title}</h2>}
        <div className='o-grid'>
          {isLoaded && playlists.length === 0 && (
            <div>{noPlaylistsText}</div>
          )}
          {isLoaded && playlists.map((item, idx) => <PlaylistItem key={`playlistitem-${idx}`} onPlaylistClick={this.onPlaylistClick} {...item} />)}
          {!isLoaded && <Loading />}
        </div>
      </div>
    )
  }
}
