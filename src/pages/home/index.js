import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistsFetch } from "../../actions";

import Playlist from "./components/playlist";

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


  render() {
    const { playlists } = this.props;

    return (
      <div>
        <h2>Welcome to Stitch playlists</h2>
        <br />
        <Playlist isLoaded={true} data={playlists.data} />
      </div>
    );
  }
}
export default HomePage;
