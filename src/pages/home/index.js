import React, { Component } from "react";
import { connect } from "react-redux";

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


  render() {
    const { playlists } = this.props;

    return (
      <div className='o-wrapper'>
        <Recommended isLoaded={true} data={playlists.data.filter(i => i.classification === 'staff_picked').sort(() => .5 - Math.random()).splice(0,3)} />
        <Playlist isLoaded={true} data={playlists.data} />
      </div>
    );
  }
}
export default HomePage;
