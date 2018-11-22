import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistsFetch, playlistsLoadMore, SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import Categories from "./components/categories";
import SEO from "../../components/SEO";
import { HOME_PAGE } from "../../constants/pages";

const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch()),
  playlistsLoadMore: (query) => dispatch(playlistsLoadMore({ query })),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: HOME_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: HOME_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch, playlistsLoadMore, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetch();
  await playlistsLoadMore("classification=staff_picked");
  setServerRendered();
})
@connect((state) => ({
  playlists: state.playlists,
  isSSR: !!state.renderedPages[HOME_PAGE]
}), prepareActions)
class HomePage extends Component {
  static propTypes = {
    playlistsFetch: PropTypes.func.isRequired,
    playlistsLoadMore: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  async componentDidMount() {
    const { playlistsFetch, playlistsLoadMore, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      await playlistsFetch();
      playlistsLoadMore("classification=staff_picked");
    } else {
      setClientRendered();
    }
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);
    const pickedPlaylists = playlists.data.filter(i => i.classification === "staff_picked").splice(0, 3);

    return (
      <>
        <SEO />
        <div className='c-hero'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--middle o-grid--large'>
              <div className='o-grid__cell c-hero__grid__cell'>
                <h1 className="c-hero__title">Collaborative <br />YouTube playlists</h1>
                <p>Discover playlists, create your own, and contribute to others.</p>
                <Link to='/create-playlist' className='c-btn c-btn--primary c-btn--large'>Create your playlist</Link>
              </div>
              <div className='o-grid__cell c-hero__grid__cell'>
                <img className='c-hero__graphic' src={require("../../images/hero-illustration.svg")} />
              </div>
            </div>
          </div>
        </div>
        <div className='o-wrapper'>
          <div className='u-margin-bottom-large'>
            {pickedPlaylists.length > 0 && (
              <Playlist
                big
                title="Our picks"
                isLoaded={isReady}
                playlists={pickedPlaylists}
              />
            )}
          </div>

          <div className='u-margin-bottom-large u-padding-bottom-large'>
            <Categories />
          </div>

          <Playlist
            title="New playlists"
            moreButton={{ title: "View All", url: "/new" }}
            isLoaded={isReady}
            playlists={playlists.data.filter(i => i.classification !== "staff_picked").splice(0, 8)}
          />
        </div>
      </>
    );
  }
}
export default HomePage;
