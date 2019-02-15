import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { fetchPurchases } from "../../actions/playlist";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import { PURCHASES_PAGE } from "../../constants/pages";
import SEO from "../../components/SEO";

const prepareActions = (dispatch) => ({
  fetchPurchases: () => dispatch(fetchPurchases()),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: PURCHASES_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: PURCHASES_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { fetchPurchases, setServerRendered } = prepareActions(store.dispatch);

  await fetchPurchases();
  setServerRendered();
})
@connect((state) => ({
  playlists_purchases: state.playlists_purchases,
  user: state.user,
  isSSR: !!state.renderedPages[PURCHASES_PAGE]
}), prepareActions)
export default class PurchasesPage extends Component {
  static propTypes = {
    fetchPurchases: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists_purchases: PropTypes.object,
  }

  componentDidMount() {
    const { fetchPurchases, setClientRendered, isSSR } = this.props;

    if (!isSSR) {
      fetchPurchases();
    } else {
      setClientRendered();
    }
  }

  render() {
    const { playlists_purchases, user } = this.props;
    const isReady = isLoaded(playlists_purchases);

    if (!user) {
      return <Redirect to="/login" />;
    }

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="My purchases" />

        <Playlist
          title="My purchases"
          isLoaded={isReady}
          playlists={playlists_purchases.data}
          customEmptyContainer={(
            <div className='o-grid__cell u-1/1'>
              <div className='c-no-results'>
                {/*<img className='c-no-results__img' src={require("../../images/message-no-bookmarks-yet.svg")} />*/}
                <p>No purchases on your account</p>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}
