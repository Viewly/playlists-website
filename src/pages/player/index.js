import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";
import VideoPlayer from "./components/video";

import { playlistFetch } from "../../actions";

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId }))
}))
class PlayerPage extends Component {
  state = {
    videoId: null
  }

  componentDidMount () {
    const { playlist, playlistFetch, match: { params: { playlistId, videoId } } } = this.props;

    playlist.id !== playlistId && playlistFetch(playlistId);
    this.setState({ videoId: parseInt(videoId, 10) });
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';
    const currentVideo = isLoaded
      ? playlist.videos.find(item => item.id === this.state.videoId)
      : false;
    console.log('playlist', playlist);
    console.log('current video', this.state.videoId, currentVideo);

    return (
      <Layout>
        {isLoaded && <VideoPlayer playlistUrl={`/playlist/${playlist.id}`} video={currentVideo} />}
      </Layout>
    );
  }
}
export default PlayerPage;
