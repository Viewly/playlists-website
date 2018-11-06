import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import { PLAYLIST_INJECT_DATA } from "../../actions";
import PlaylistItem from "./item";
import Loading from "../loading";

@withRouter
@connect(null, (dispatch) => ({
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
}))
export default class Playlist extends Component {
  static defaultProps = {
    moreButton: false
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
  }

  render() {
    const { isLoaded, playlists, title, moreButton, big } = this.props;

    return (
      <div>
        <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
          {title && <div className='o-grid__cell'><h2 className='u-h3'>{title}</h2></div>}
          {moreButton && (
            <div className='o-grid__cell'>
              <Link className='c-link-secondary' to={moreButton.url}>{moreButton.title}</Link>
            </div>
          )}
        </div>

        <div className='o-grid'>
          {isLoaded && playlists.map((item, idx) => <PlaylistItem big={big} key={`playlistitem-${idx}`} onPlaylistClick={this.onPlaylistClick} {...item} />)}
          {!isLoaded && <Loading />}
          {isLoaded && playlists.length === 0 && (
            <div className='o-grid__cell u-1/1'>
              <div className='c-no-results'>
                <img className='c-no-results__img' src={require('../../images/message-no-playlists-yet.svg')} />
                <p>There are no playlists in this category yet. <br />Try browsing other categories or <Link to='/create-playlist'>create a playlist</Link> <br />in this one.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
