import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "./layout";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";

import Playlist from "./components/playlist";
import Recommended from "./components/recommended";

@connect((state) => ({
  playlists: state.playlists
}), (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch()),
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
}))
class HomePage extends Component {
  componentDidMount () {
    const { playlistsFetch } = this.props;

    playlistsFetch();
  }

  onPlaylistClick = (playlistId) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.data.find(item => item.id === playlistId);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${playlistId}`);
  }

  render() {
    const { playlists } = this.props;

    return (
      <Layout>
        <div className='c-hero'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--middle o-grid--large'>
              <div className='o-grid__cell c-hero__grid__cell'>
                <h1 className="c-hero__title">Collaborative <br />YouTube playlists</h1>
                <p>Discover playlists, create your own, and contribute to others.</p>
                <Link to='/new' className='c-btn c-btn--primary c-btn--large'>Create your playlist</Link>
              </div>
              <div className='o-grid__cell c-hero__grid__cell'>
                <img className='c-hero__graphic' src={require('../../images/hero-illustration.svg')} />
              </div>
            </div>
          </div>
        </div>
        <div className='o-wrapper'>
          <Recommended isLoaded={true} data={playlists.data.filter(i => i.classification === 'staff_picked').sort(() => .5 - Math.random()).splice(0,3)} onPlaylistClick={this.onPlaylistClick} />
          <Playlist isLoaded={true} data={playlists.data} onPlaylistClick={this.onPlaylistClick} />
        </div>
      </Layout>
    );
  }
}
export default HomePage;
