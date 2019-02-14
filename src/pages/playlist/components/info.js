import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import StripeCheckout from "react-stripe-checkout";
import Video from "./video";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";
import { playlistPurchase } from "../../../actions/playlist";

@connect((state) => ({
  playlist: state.playlist,
}), (dispatch) => ({
  playlistPurchase: (playlist_id, price, stripeData) => dispatch(playlistPurchase({ playlist_id, price, stripeData }))
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  onStripe = (args) => {
    const { playlistPurchase, playlist } = this.props;

    playlistPurchase(playlist.id, 0.99, args);
  }

  render() {
    const { playlist, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isLoading = playlist._status === LOADING;
    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div className='c-premium-playlist-overlay'>
        <div className="c-premium-playlist-overlay__content">
          <p>This is a premium playlist.</p>
          <StripeCheckout
            token={this.onStripe}
            stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
            >
              <button className="c-btn c-btn--secondary">Unlock for $0.99</button>
          </StripeCheckout>
        </div>
        <div className='blocked o-grid'>
          {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
          {isLoading && <Loading />}
        </div>
      </div>
    );
  }
}
