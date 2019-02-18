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
import { OPEN_TOAST } from "../../../actions/toast";

@connect((state) => ({
  playlist: state.playlist,
  user: state.user
}), (dispatch) => ({
  playlistPurchase: (playlist_id, price, stripeData) => dispatch(playlistPurchase({ playlist_id, price, stripeData })),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  state = {
    price: 0,
    isPurchased: false,
    isLoading: false
  }

  componentDidMount() {
    const { match: { params: { playlistId } } } = this.props;

    const price = getRandomPrice();
    const isPurchased = getGuestPurchase(playlistId);
    this.setState({ price, isPurchased });
  }

  onStripe = async (args) => {
    const { openToast, user, playlistFetch, playlistPurchase, playlist, match: { params: { playlistId } } } = this.props;

    this.setState({ isLoading: true });
    const response = await playlistPurchase(playlist.id, this.state.price, args);

    if (response.success) {
      if (!user) {
        setGuestPurchase(playlistId);
        this.setState({ isPurchased: true });
      }

      playlistFetch(playlist.id);
    } else {
      openToast({ type: "error", message: `Payment failed with code "${response.error.code}"`});
      console.log("ERR", response);
    }

    this.setState({ isLoading: false });

  }

  renderButton = () => {
    if (this.state.isLoading) {
      return <button className="c-btn c-btn--secondary">Please wait</button>
    } else if(this.state.price === 0) {
      return <button className="c-btn c-btn--secondary">Loading</button>
    } else {
      return <button className="c-btn c-btn--secondary">Unlock now</button>;
    }
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
            <h4>This is a premium playlist.</h4>
            <p>Unlock it for <del className='c-del'>${this.state.price * 3}</del> ${this.state.price}.</p>
            <StripeCheckout
              token={this.onStripe}
              email={user?.email}
              amount={this.state.price * 100}
              stripeKey="pk_live_aUa4E0B0lfrIj0pQHYg6odz1"
              // stripeKey="pk_test_pW1Uy3lOn1vPQfzQMHsJgdxw"
              >
              {this.renderButton()}
            </StripeCheckout>
            <p>
              <small className='c-annotation c-annotation--dark u-margin-top-tiny'>3 days left at this price!</small>
            </p>
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
