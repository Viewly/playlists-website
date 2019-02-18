import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import Video from "./video";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";
import { playlistPurchase } from "../../../actions/playlist";
import { playlistFetch } from "../../../actions";
import { getGuestPurchase, getRandomPrice, setGuestPurchase } from "../../../utils";

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

  state = {
    price: 0,
    isPurchased: false
  }

  componentDidMount() {
    const { match: { params: { playlistId } } } = this.props;

    const price = getRandomPrice();
    const isPurchased = getGuestPurchase(playlistId);
    this.setState({ price, isPurchased });
  }

  onStripe = async (args) => {
    const { user, playlistFetch, playlistPurchase, playlist, match: { params: { playlistId } } } = this.props;

    await playlistPurchase(playlist.id, this.state.price, args);

    if (!user) {
      setGuestPurchase(playlistId);
      this.setState({ isPurchased: true });
    }

    playlistFetch(playlist.id);
  }

  render() {
    const { playlist, user, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isLoading = playlist._status === LOADING;
    if (!isLoaded) return <div>Loading ...</div>;

    if (!this.state.isPurchased && (playlist.premium && !playlist.purchased)) {
      return (
        <div className='c-premium-playlist-overlay'>
          <div className="c-premium-playlist-overlay__content">
            <p>This is a premium playlist.</p>
            <StripeCheckout
              token={this.onStripe}
              email={user?.email}
              amount={this.state.price * 100}
              stripeKey="pk_live_aUa4E0B0lfrIj0pQHYg6odz1"
              >
              {this.state.price > 0 && <button className="c-btn c-btn--secondary">Unlock for ${this.state.price}</button>}
              {this.state.price === 0 && <button className="c-btn c-btn--secondary">Loading</button>}
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
