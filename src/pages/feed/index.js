import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { playlistsFetchNew } from "../../actions/playlist";
import { isLoaded, asyncLoad, isPending } from "../../utils";
import { FEED_PAGE } from "../../constants/pages";
import NewPlaylists from "./components/new";

import SEO from "../../components/SEO";
import { Redirect } from "react-router-dom";

const prepareActions = (dispatch) => ({
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: FEED_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: FEED_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchNew, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchNew({ page: 0, limit: 12 });
  setServerRendered();
})
@connect((state) => ({
  playlists_new: state.playlists_new,
  isSSR: !!state.renderedPages[FEED_PAGE],
  user: state.user
}), prepareActions)
export default class FeedPage extends Component {
  static propTypes = {
    playlistsFetchNew: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  async componentDidMount() {
    const { playlists_new, playlistsFetchNew, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      isPending(playlists_new) && playlistsFetchNew({ page: 0, limit: 12 });
    } else {
      setClientRendered();
    }
  }


  render() {
    const { user } = this.props;
    
    if (!user) {
      return <Redirect to='/feed/create' />;
    }

    return (
      <>
        <SEO />

        <div className='o-wrapper u-margin-top-large u-margin-top-huge@large'>
          <NewPlaylists />
        </div>
      </>
    );
  }
}
