import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { playlistsFetchToptopic, playlistsFetchNew, playlistsFetchPicked } from "../../actions/playlist";
import { isLoaded, asyncLoad, isPending } from "../../utils";
import { EXPLORE_PAGE } from "../../constants/pages";

import Playlist from "../../components/PlaylistContainer";
import PlaylistSwiper from "../../components/PlaylistContainer/swiper";
import Categories from "./components/categories";
import SEO from "../../components/SEO";

const hashtagPicked = "%23gaming"; // %23 is #

const prepareActions = (dispatch) => ({
  playlistsFetchPicked: (params) => dispatch(playlistsFetchPicked(params)),
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  playlistsFetchToptopic: (params) => dispatch(playlistsFetchToptopic(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: EXPLORE_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: EXPLORE_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchPicked, playlistsFetchNew, playlistsFetchToptopic, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchPicked({ limit: 10 });
  await playlistsFetchNew({ page: 0, limit: 4 });
  await playlistsFetchToptopic({ tag: 'machine-learning', limit: 3 });
  setServerRendered();
})
@connect((state) => ({
  playlists_picked: state.playlists_picked,
  playlists_new: state.playlists_new,
  playlists_toptopic: state.playlists_toptopic,
  isSSR: !!state.renderedPages[EXPLORE_PAGE],
  user: state.user
}), prepareActions)
export default class ExplorePage extends Component {
  static propTypes = {
    playlistsFetchPicked: PropTypes.func.isRequired,
    playlistsFetchNew: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  async componentDidMount() {
    const { playlists_picked, playlists_new, playlists_toptopic, playlistsFetchPicked, playlistsFetchNew, playlistsFetchToptopic, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      isPending(playlists_picked) && await playlistsFetchPicked({ limit: 10 });
      isPending(playlists_new) && playlistsFetchNew({ page: 0, limit: 12 });
      isPending(playlists_toptopic) && playlistsFetchToptopic({ tag: 'machine-learning', limit: 6 });
    } else {
      setClientRendered();
    }
  }


  render() {
    const { playlists_picked, playlists_toptopic, playlists_new, user } = this.props;

    return (
      <>
        <SEO />

        {!user && (
          <div className='c-hero'>
            <div className='o-wrapper'>
              <div className='o-grid o-grid--middle o-grid--large'>
                <div className='o-grid__cell c-hero__grid__cell'>
                  <h1 className="c-hero__title">Collaborative <br />YouTube playlists</h1>
                  <p>Discover playlists, create your own, and contribute to others.</p>
                  <Link to='/register' className='c-btn c-btn--primary c-btn--large'>Create your playlist</Link>
                </div>
                <div className='o-grid__cell c-hero__grid__cell'>
                  <img alt='' className='c-hero__graphic' src={require("../../images/hero-illustration.svg")} />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className='o-wrapper u-margin-top-large u-margin-top-huge@large'>
          <div className='u-margin-bottom-huge'>
            <PlaylistSwiper
              title="Pick of the week"
              isLoaded={isLoaded(playlists_picked)}
              playlists={playlists_picked.data}
            />
          </div>
        </div>

        <div className="c-section c-section--grey c-section--small u-margin-bottom-large">
          <div className='o-wrapper'>
            <span className="c-featured">Featured topic</span>
            <PlaylistSwiper
              title="The world of machine learning"
              swiper={{ slidesPerView: 3 }}
              moreButton={{ title: "View all", url: "/search/?query=%23machine-learning" }}
              isLoaded={isLoaded(playlists_toptopic)}
              playlists={playlists_toptopic.data}
            />
          </div>
        </div>

        <div className='o-wrapper'>

          <div className='u-margin-bottom-huge'>
            <PlaylistSwiper
              title="New playlists"
              moreButton={{ title: "View All", url: "/new" }}
              isLoaded={isLoaded(playlists_new)}
              playlists={playlists_new.data}
            />
          </div>

          <div className='u-margin-bottom-huge'>
            <Categories />
          </div>

        </div>
      </>
    );
  }
}
