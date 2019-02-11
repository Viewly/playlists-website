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
    const { playlists_picked, playlists_toptopic, playlists_new } = this.props;

    return (
      <>
        <SEO />

        {/*<div className='c-hero'>
          <div className='o-wrapper'>
            <Playlist
              title="Featured playlists"
              isLoaded={isLoaded(playlists_picked)}
              playlists={playlists_picked.data.slice(0, 1)}
            />
          </div>
        </div>*/}

        <div className='o-wrapper u-margin-top-large u-margin-top-huge@large'>
          <div className='u-margin-bottom-large'>
            <PlaylistSwiper
              title="Pick of the week"
              isLoaded={isLoaded(playlists_picked)}
              playlists={playlists_picked.data}
            />
          </div>

          <div className='u-margin-bottom-large'>
            <PlaylistSwiper
              title="New playlists"
              moreButton={{ title: "View All", url: "/new" }}
              isLoaded={isLoaded(playlists_new)}
              playlists={playlists_new.data}
            />
          </div>

          <div className='u-margin-bottom-large'>
            <span className="c-featured">Featured topic</span>
            <PlaylistSwiper
              title="The world of machine learning"
              swiper={{ slidesPerView: 3 }}
              moreButton={{ title: "View all", url: "/search/?query=%23machine-learning" }}
              isLoaded={isLoaded(playlists_toptopic)}
              playlists={playlists_toptopic.data}
            />
          </div>

          <div className='u-margin-bottom-large u-padding-bottom-large'>
            <Categories />
          </div>

        </div>
      </>
    );
  }
}
