import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { playlistsFetchHashtag, playlistsFetchNew, playlistsFetchPicked } from "../../actions/playlist";
import { isLoaded, asyncLoad, isPending } from "../../utils";
import { HOME_PAGE } from "../../constants/pages";

import Playlist from "../../components/PlaylistContainer";
import PlaylistSwiper from "../../components/PlaylistContainer/swiper";
import Categories from "./components/categories";
import SEO from "../../components/SEO";

const hashtagPicked = "%23gaming"; // %23 is #

const prepareActions = (dispatch) => ({
  playlistsFetchPicked: (params) => dispatch(playlistsFetchPicked(params)),
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params)),
  playlistsFetchHashtag: (params) => dispatch(playlistsFetchHashtag(params)),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: HOME_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: HOME_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetchPicked, playlistsFetchNew, playlistsFetchHashtag, setServerRendered } = prepareActions(store.dispatch);

  await playlistsFetchPicked({ limit: 10 });
  await playlistsFetchNew({ page: 0, limit: 4 });
  await playlistsFetchHashtag({ limit: 3, query: hashtagPicked });
  setServerRendered();
})
@connect((state) => ({
  playlists_picked: state.playlists_picked,
  playlists_new: state.playlists_new,
  playlists_hashtag: state.playlists_hashtag,
  isSSR: !!state.renderedPages[HOME_PAGE],
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
    const { playlists_picked, playlists_new, playlists_hashtag, playlistsFetchPicked, playlistsFetchNew, playlistsFetchHashtag, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      isPending(playlists_picked) && await playlistsFetchPicked({ limit: 10 });
      isPending(playlists_new) && playlistsFetchNew({ page: 0, limit: 12 });
      isPending(playlists_hashtag) && playlistsFetchHashtag({ limit: 6, query: hashtagPicked });
    } else {
      setClientRendered();
    }
  }


  render() {
    const { playlists_picked, playlists_hashtag, playlists_new } = this.props;

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
              title="New playlist"
              isLoaded={isLoaded(playlists_new)}
              playlists={playlists_new.data}
            />
          </div>

          <div className='u-margin-bottom-large'>
            <span className="c-featured">Featured topic</span>
            <PlaylistSwiper
              title="The world of gaming"
              swiper={{ slidesPerView: 3 }}
              moreButton={{ title: "View all", url: "/search/?query=%23gaming" }}
              isLoaded={isLoaded(playlists_hashtag)}
              playlists={playlists_hashtag.data}
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
