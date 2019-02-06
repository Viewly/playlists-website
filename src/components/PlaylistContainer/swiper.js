import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Swiper from 'react-id-swiper';

import { PLAYLIST_INJECT_DATA } from "../../actions";
import { userAddBookmark, userRemoveBookmark } from "../../actions/user";
import PlaylistItem from "./item";
import Loading from "../loading";

@withRouter
@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data }),
  userAddBookmark: (playlist_id) => dispatch(userAddBookmark({ playlist_id })),
  userRemoveBookmark: (playlist_id) => dispatch(userRemoveBookmark({ playlist_id })),
}))
export default class PlaylistSwiper extends Component {
  static propTypes = {
    injectPlaylist: PropTypes.func,
    playlists: PropTypes.array,
    title: PropTypes.node,
    moreButton: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    size: PropTypes.string,
    isLoaded: PropTypes.bool,
    history: PropTypes.object,
  }

  static defaultProps = {
    moreButton: false
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists, onPlaylistClick, customClickHandler } = this.props;
    const selectedPlaylist = playlists.find(item => item.url === url);

    if (customClickHandler) {
      customClickHandler(evnt, selectedPlaylist);
    } else {
      if (!evnt.ctrlKey && !evnt.metaKey) {
        evnt.preventDefault();
        injectPlaylist(selectedPlaylist);
        onPlaylistClick && onPlaylistClick(selectedPlaylist.id);
        history.push(`/playlist/${url}`);
      }
    }
  }

  renderNoPlaylists = () => {
    const { customEmptyContainer } = this.props;

    if (customEmptyContainer) {
      return customEmptyContainer;
    }

    return (
      <div className='o-grid__cell u-1/1'>
        <div className='c-no-results'>
          <img alt='' className='c-no-results__img' src={require("../../images/message-no-playlists-yet.svg")} />
          <p>There are no playlists in this category yet. <br />Try browsing other categories or <Link to='/create-playlist'>create a playlist</Link> <br />in this one.</p>
        </div>
      </div>
    );
  }

  render() {
    const { isLoaded, playlists, title, moreButton, size, swiper } = this.props;
    const customClass = "swiper-slide";

    const params = {
      navigation: {
        prevEl: '.c-swiper-nav.c-swiper-nav--previous',
        nextEl: '.c-swiper-nav.c-swiper-nav--next'
      },
      spaceBetween: 20,
      slidesPerView: 4,
      ...swiper
    }

    return (
      <div>
        {title && (
          <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
            <div className='o-grid__cell'>
              <h2 className='u-h3'>{title}</h2>
            </div>
            {moreButton && (
              <div className='o-grid__cell'>
                <Link className='c-link-secondary' to={moreButton.url}>{moreButton.title}</Link>
              </div>
            )}
          </div>
        )}

        {isLoaded && (
          <Swiper {...params}>
            {playlists.map((item) => (
              <PlaylistItem
                customClass={customClass}
                key={`playlistitem-${item.id}`}
                onPlaylistClick={this.onPlaylistClick}
                {...item}
                />
            ))}
          </Swiper>
        )}
        {!isLoaded && <Loading />}
        {isLoaded && playlists.length === 0 && this.renderNoPlaylists()}
      </div>
    );
  }
}
