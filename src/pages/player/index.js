import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";
import VideoPlayer from "./components/video";
import Playlist from "./components/playlist";

import { playlistFetch } from "../../actions";

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId }))
}))
class PlayerPage extends Component {
  state = {
    videoId: null,
    showPlaylist: false
  }

  componentDidMount () {
    const { playlist, playlistFetch, match: { params: { playlistId, videoId } } } = this.props;

    playlist.id !== playlistId && playlistFetch(playlistId);
    this.setState({ videoId: parseInt(videoId, 10) });
  }

  togglePlaylist = () => {
    this.setState({ showPlaylist: !this.state.showPlaylist });
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';
    const currentVideo = isLoaded
      ? playlist.videos.find(item => item.id === this.state.videoId)
      : false;

    return (
      <Layout>
        {isLoaded && <VideoPlayer togglePlaylist={this.togglePlaylist} playlistUrl={`/playlist/${playlist.id}`} video={currentVideo} />}
        {isLoaded && this.state.showPlaylist && <Playlist togglePlaylist={this.togglePlaylist} videos={playlist.videos} />}
      </Layout>
    );
  }
}
export default PlayerPage;
