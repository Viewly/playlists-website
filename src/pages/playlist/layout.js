import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Route, Switch } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

import Header from "./components/header";
import SharePlaylist from "./components/share";
import SEO from "../../components/SEO";

import { sumVideoDurations } from "../../utils";
import { LOADED, LOADING } from "../../constants/status_types";
import { OPEN_LOGIN_MODAL, userAddBookmark, userRemoveBookmark } from "../../actions/user";
import { OPEN_TOAST } from "../../actions/toast";
import PlaylistTabs from "./components/tabs";
import PlaylistInfo from "./components/info";
import PlaylistComments from "./components/comments";
import { minBy } from "lodash";

@connect((state) => ({
  playlist: state.playlist,
  user: state.user
}), (dispatch) => ({
  userAddBookmark: (playlist_id) => dispatch(userAddBookmark({ playlist_id })),
  userRemoveBookmark: (playlist_id) => dispatch(userRemoveBookmark({ playlist_id })),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),
  openRegisterModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "register" } }),
}))
export default class PlaylistLayout extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
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

  onStripe = (args) => {
    console.log('stripe args', args);
  }

  render() {
    const { playlist, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isOwner = this.isOwner();
    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div>
        <Header
          title={playlist.title}
          author={playlist.user}
          duration={sumVideoDurations(playlist.videos)}
          poster={playlist.playlist_thumbnail_url}
          description={playlist.description}
          views={playlist.views}
          playVideo={this.playVideo}
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

                <button onClick={this.onBookmarkClick} className={`c-btn u-margin-right u-padding-left-none u-padding-right-none has-colored-icon ${playlist.bookmarked ? "is-active" : ""}`}>
                  <div className='c-colored-icon o-icon'>
                    <img alt='' className='c-colored-icon__icon' src={require("../../images/icons/bookmark.svg")} />
                    <img alt='' className='c-colored-icon__icon' src={require("../../images/icons/bookmark-hover.svg")} />
                  </div>
                </button>

                <SharePlaylist playlist={playlist} />

                {isOwner && (
                  <Link to={`/create-playlist/${playlist.id}`} className='c-btn c-btn--secondary u-margin-left'>
                    Edit playlist
                  </Link>
                )}

                {!isOwner && (
                  <StripeCheckout
                    token={this.onStripe}
                    stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
                    >
                      <button className="c-btn c-btn--secondary c-btn--small u-margin-left">Unlock for $9.99</button>
                  </StripeCheckout>
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
