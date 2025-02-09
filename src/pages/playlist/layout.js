import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";

import Header from "./components/header";
import SharePlaylist from "./components/share";
import SEO from "../../components/SEO";

import { isLoaded, sumVideoDurations } from "../../utils";
import { LOADED, LOADING } from "../../constants/status_types";
import { OPEN_LOGIN_MODAL, userAddBookmark, userRemoveBookmark } from "../../actions/user";
import { OPEN_TOAST } from "../../actions/toast";
import PlaylistTabs from "./components/tabs";
import PlaylistInfo from "./components/info";
import PlaylistComments from "./components/comments";
import { minBy } from "lodash";
import { BOOKMARK_TOOLTIP_HIDE } from "../../actions";

@connect((state) => ({
  playlist: state.playlist,
  user: state.user,
  localStorage: state.localStorage
}), (dispatch) => ({
  userAddBookmark: (playlist_id) => dispatch(userAddBookmark({ playlist_id })),
  userRemoveBookmark: (playlist_id) => dispatch(userRemoveBookmark({ playlist_id })),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),
  hideBookmark: (data) => dispatch({ type: BOOKMARK_TOOLTIP_HIDE, data }),
  openRegisterModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "register" } }),
}))
export default class PlaylistLayout extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  state = {
    bookmarkActive: false
  }

  componentDidMount() {
    const { localStorage } = this.props;

    if (isLoaded(localStorage) && !localStorage.data.hideBookmark) {
      setTimeout(() => this.setState({ bookmarkActive: true }), 1000);
    }
  }

  componentDidUpdate(prevProps) {
    const { localStorage } = this.props;

    if (!isLoaded(prevProps.localStorage) && isLoaded(localStorage) && !localStorage.data.hideBookmark) {
      setTimeout(() => this.setState({ bookmarkActive: true }), 1000);
    }
  }

  onBookmarkClick = () => {
    const { openRegisterModal, user, playlist, userAddBookmark, userRemoveBookmark } = this.props;

    if (!user) {
      openRegisterModal();
    } else {
      if (playlist.bookmarked) {
        userRemoveBookmark(playlist.id);
      } else {
        userAddBookmark(playlist.id);
      }
    }
  }

  playVideo = () => {
    const { playlist, history } = this.props;

    if (playlist.percentage > 0 && playlist.percentage < 100) {
      const sorted = playlist.videos.sort((a,b) => {
        if (a.position < b.position) return -1
        else if (a.position > b.position) return 1;
        else return 0;
      });

      const videoToResume = sorted.find((item) => isNaN(item.percentage) || item.percentage < 100);
      history.push(`/player/${playlist.url}/${videoToResume.id}`);
    } else {
      const firstVideo = minBy(playlist.videos, item => item.position);
      history.push(`/player/${playlist.url}/${firstVideo.id}`);
    }
  }

  isOwner = () => {
    const { user, playlist } = this.props;
    return user?.id === playlist?.user?.id;
  }

  render() {
    const { playlist, localStorage, hideBookmark, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isOwner = this.isOwner();
    const { user } = this.props;
    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div>
        <Header
          id={playlist.id}
          title={playlist.title}
          author={playlist.user}
          duration={sumVideoDurations(playlist.videos)}
          poster={playlist.playlist_thumbnail_url}
          description={playlist.description}
          views={playlist.views}
          playVideo={this.playVideo}
          mustPurchase={playlist.premium && !playlist.purchased}
          playVideoLabel={playlist.percentage > 0 && playlist.percentage < 100 ? "Resume" : "Play all"}
          hashtags={playlist.hashtags && playlist.hashtags.split(" ") || []}
          category={playlist.category} />

        <SEO playlist={playlist} />

        <div className='c-section c-section--grey'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--small o-grid--auto o-grid--middle o-grid--between u-margin-bottom u-margin-bottom-small@large'>
              <div className='o-grid__cell u-margin-bottom'>
                <PlaylistTabs comments={playlist?.comment_count} videos={playlist?.videos?.length} url={playlist.url} />
              </div>
              <div className='o-grid__cell u-margin-bottom'>
                <span className={`c-tooltip ${this.state.bookmarkActive ? 'is-active' : ''}`}>
                  <button onClick={this.onBookmarkClick} className={`c-btn u-margin-right u-padding-none has-colored-icon ${playlist.bookmarked ? "is-active" : ""}`}>
                    <div className='c-colored-icon o-icon'>
                      <img alt='' className='c-colored-icon__icon' src={require("../../images/icons/bookmark.svg")} />
                      <img alt='' className='c-colored-icon__icon' src={require("../../images/icons/bookmark-hover.svg")} />
                    </div>
                  </button>
                  {!user && (
                    <div className="c-tooltip__content">
                      <h6 className='c-tooltip__heading'>Bookmark now!</h6>
                      <p>Get notified when new videos <br/>are added to this playlist</p>
                      <div className="u-text-right u-margin-top-tiny">
                        <button className='c-btn c-tooltip__btn-dismiss' onClick={() => {
                          hideBookmark();
                          this.setState({ bookmarkActive: false });
                        }}>&times;</button>
                      </div>
                    </div>
                  )}
                </span>

                <SharePlaylist playlist={playlist} />

                {isOwner && (
                  <Link to={`/create-playlist/${playlist.id}`} className='c-btn c-btn--secondary u-margin-left'>
                    Edit playlist
                  </Link>
                )}
              </div>
            </div>

            <div>
              <Switch>
                <Route exact path='/playlist/:playlistId' component={PlaylistInfo}/>
                {playlist.id && <Route path='/playlist/:playlistId/comments' component={PlaylistComments}/>}
              </Switch>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
