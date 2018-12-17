import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "./header";
import Video from "./video";
import SharePlaylist from "./share";
import SEO from "../../../components/SEO";

import { sumVideoDurations } from "../../../utils";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";
import { userAddBookmark, userRemoveBookmark } from "../../../actions/user";
import { OPEN_TOAST } from "../../../actions/toast";

@connect((state) => ({
  playlist: state.playlist,
  user: state.user
}), (dispatch) => ({
  userAddBookmark: (playlist_id) => dispatch(userAddBookmark({ playlist_id })),
  userRemoveBookmark: (playlist_id) => dispatch(userRemoveBookmark({ playlist_id })),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data })
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  onBookmarkClick = () => {
    const { openToast, playlist, userAddBookmark, userRemoveBookmark } = this.props;

    if (playlist.bookmarked) {
      userRemoveBookmark(playlist.id);
      openToast({ type: "info", message: "Playlist removed from bookmarks" });
    } else {
      userAddBookmark(playlist.id);
      openToast({ type: "info", message: "Playlist added to bookmarks" });
    }
  }

  isOwner = () => {
    const { user, playlist } = this.props;
    return user?.id === playlist?.user?.id;
  }

  render() {
    const { playlist, user, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isLoading = playlist._status === LOADING;
    const isOwner = this.isOwner();
    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div>
        <Header
          title={playlist.title}
          author={playlist.user_id}
          duration={sumVideoDurations(playlist.videos)}
          poster={playlist.playlist_thumbnail_url}
          description={playlist.description}
          hashtags={playlist.hashtags && playlist.hashtags.split(" ") || []}
          category={playlist.category} />

        <SEO playlist={playlist} />
        <div className='c-section c-section--grey'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--small o-grid--auto o-grid--middle o-grid--between u-margin-bottom u-margin-bottom-small@large'>
              <div className='o-grid__cell u-margin-bottom'>
                <span><b>{playlist.videos && playlist.videos.length} videos</b></span>
              </div>
              <div className='o-grid__cell u-margin-bottom'>
                {user && (
                  <button onClick={this.onBookmarkClick} className={`c-btn u-margin-right u-padding-left-none u-padding-right-none has-colored-icon ${playlist.bookmarked ? "is-active" : ""}`}>
                    <div className='c-colored-icon o-icon'>
                      <img className='c-colored-icon__icon' src={require("../../../images/icons/bookmark.svg")} />
                      <img className='c-colored-icon__icon' src={require("../../../images/icons/bookmark-hover.svg")} />
                    </div>
                  </button>
                )}
                <SharePlaylist playlist={playlist} />

                {isOwner
                  ? <Link to={`/create-playlist/${playlist.id}`} className='c-btn c-btn--secondary u-margin-left'>
                      Edit playlist
                    </Link>
                  : <Link to={`/playlist/${playlist.id}/suggest`} className='c-btn c-btn--primary u-margin-left'>
                      Suggest a video
                    </Link>
                }
              </div>
            </div>
            <div className='o-grid'>
              {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
              {isLoading && <Loading />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
