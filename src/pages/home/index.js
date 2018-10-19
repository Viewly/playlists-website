import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";

import { playlistsFetch } from "../../actions";

import Playlist from "./components/playlist";
import Recommended from "./components/recommended";

@connect((state) => ({
  playlists: state.playlists
}), (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch())
}))
class HomePage extends Component {
  componentDidMount () {
    const { playlistsFetch } = this.props;

    playlistsFetch();
  }

  onPlaylistClick = (playlistId) => (evnt) => {
    const { history } = this.props;

    evnt.preventDefault();
    history.push(`/playlist/${playlistId}`);
  }

  render() {
    const { playlists } = this.props;

    return (
      <Layout>
        <div className='c-hero'>
          <div className='o-wrapper'>
            <div className="c-hero">
              <div className='o-grid'>
                <div className='o-grid__cell c-hero__grid__cell u-2/3'>
                  <h1 className="c-hero__title">Collaborative <br />YouTube playlists</h1>
                  <p>Discover playlists, make your own, and contribute to others.</p>
                  <a href='#' className='c-btn c-btn--primary c-btn--large'>Create your playlist</a>
                </div>
                <div className='o-grid__cell c-hero__grid__cell u-1/3'>

                </div>
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
