import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { playlistsFetchToptopic, playlistsFetchNew, playlistsFetchPicked } from "../../actions/playlist";
import { isLoaded, asyncLoad, isPending } from "../../utils";
import { HOME_PAGE } from "../../constants/pages";

import Playlist from "../../components/PlaylistContainer";
import Categories from "./components/categories";
import SEO from "../../components/SEO";
import NewPlaylists from "./components/new";

const hashtagPicked = "%23gaming"; // %23 is #

const prepareActions = (dispatch) => ({
  playlistsFetchPicked: (params) => dispatch(playlistsFetchPicked(params)),
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  playlistsFetchToptopic: (params) => dispatch(playlistsFetchToptopic(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: HOME_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: HOME_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchPicked, playlistsFetchNew, playlistsFetchToptopic, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchPicked();
  await playlistsFetchNew({ page: 0, limit: 12 });
  await playlistsFetchToptopic({ tag: 'machine-learning', limit: 4 });
  setServerRendered();
})
@connect((state) => ({
  playlists_picked: state.playlists_picked,
  playlists_new: state.playlists_new,
  playlists_toptopic: state.playlists_toptopic,
  isSSR: !!state.renderedPages[HOME_PAGE],
  user: state.user
}), prepareActions)
class HomePage extends Component {
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
      isPending(playlists_picked) && await playlistsFetchPicked();
      isPending(playlists_new) && playlistsFetchNew({ page: 0, limit: 12 });
      isPending(playlists_toptopic) && playlistsFetchToptopic({ tag: 'machine-learning', limit: 4 });
    } else {
      setClientRendered();
    }
  }


  render() {
    const { playlists_picked, playlists_toptopic } = this.props;
    const isReady = isLoaded(playlists_picked);
    const { user } = this.props;

    if (user) {
      return <Redirect to='/feed' />;
    } else {
      return <Redirect to='/explore' />;
    }

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
          <div className='u-margin-bottom-large'>
            <Playlist
              title="Picks of the week"
              size="big"
              isLoaded={isReady}
              playlists={playlists_picked.data}
            />
          </div>

          <div className='u-margin-bottom-large'>
            <span className="c-featured">Featured topic</span>
            <Playlist
              title="The world of Machine Learning"
              size="medium"
              moreButton={{ title: "View all", url: "/search/?query=%23machine-learning" }}
              isLoaded={isLoaded(playlists_toptopic)}
              playlists={playlists_toptopic.data}
            />
          </div>

          <div className='u-margin-bottom-large u-padding-bottom-large'>
            <Categories />
          </div>

          <NewPlaylists />
        </div>
      </>
    );
  }
}

export default HomePage;
