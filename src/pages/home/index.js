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
        <div className='o-wrapper'>
          <Recommended isLoaded={true} data={playlists.data.filter(i => i.classification === 'staff_picked').sort(() => .5 - Math.random()).splice(0,3)} onPlaylistClick={this.onPlaylistClick} />
          <Playlist isLoaded={true} data={playlists.data} onPlaylistClick={this.onPlaylistClick} />
        </div>
      </Layout>
    );
  }
}
export default HomePage;
