import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";

const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch()),
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch();
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class HomePage extends Component {
  componentDidMount() {
    const { playlistsFetch } = this.props;

    playlistsFetch();
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.data.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

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
                <img className='c-hero__graphic' src={require('../../images/hero-illustration.svg')} />
              </div>
            </div>
          </div>
        </div>
        <div className='o-wrapper'>
          <div className='u-margin-bottom-large'>
            <Playlist
              big
              title="Staff picks"
              isLoaded={isReady}
              playlists={playlists.data.filter(i => i.classification === 'staff_picked').splice(0,3)}
              />
          </div>

          <Playlist
            title="Latest playlists"
            moreButton={{ title: 'See more', url: '/new' }}
            isLoaded={isReady}
            playlists={playlists.data.filter(i => i.classification !== 'staff_picked').splice(0, 8)}
            />
        </div>
      </>
    );
  }
}
export default HomePage;
