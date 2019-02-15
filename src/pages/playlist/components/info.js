import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import Video from "./video";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";
import { playlistPurchase } from "../../../actions/playlist";
import { playlistFetch } from "../../../actions";
import { getRandomPrice } from "../../../utils";

const PLAYLIST_PRICE = getRandomPrice();

@connect((state) => ({
  playlist: state.playlist,
  user: state.user
}), (dispatch) => ({
  playlistPurchase: (playlist_id, price, stripeData) => dispatch(playlistPurchase({ playlist_id, price, stripeData })),
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  onStripe = async (args) => {
    const { playlistFetch, playlistPurchase, playlist } = this.props;

    await playlistPurchase(playlist.id, PLAYLIST_PRICE, args);

    playlistFetch(playlist.id);
  }

  render() {
    const { playlist, user, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isLoading = playlist._status === LOADING;
    if (!isLoaded) return <div>Loading ...</div>;

    if (playlist.premium && !playlist.purchased) {
      return (
        <div className='c-premium-playlist-overlay'>
          <div className="c-premium-playlist-overlay__content">
            <p>This is a premium playlist.</p>
            <StripeCheckout
              token={this.onStripe}
              email={user.email}
              amount={PLAYLIST_PRICE * 100}
              stripeKey="pk_test_pW1Uy3lOn1vPQfzQMHsJgdxw"
              >
                <button className="c-btn c-btn--secondary">Unlock for ${PLAYLIST_PRICE}</button>
            </StripeCheckout>
          </div>
          <div className='o-grid'>
            {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
            {isLoading && <Loading />}
          </div>
        </div>
      );
    } else {
      return (
        <div className='o-grid'>
          {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
          {isLoading && <Loading />}
        </div>
      )
    }
  }
}
