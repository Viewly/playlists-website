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

  componentDidUpdate (prevProps) {
    if (this.props.match.params.videoId !== prevProps.match.params.videoId) {
      this.setState({ videoId: parseInt(this.props.match.params.videoId, 10) });
    }
  }

  togglePlaylist = () => {
    this.setState({ showPlaylist: !this.state.showPlaylist });
  }

  getNextVideoId = (videoId) => {
    const { playlist } = this.props;
    const currentVideo = playlist.videos.find(item => item.id === videoId);

    if (currentVideo.position >= playlist.videos.length - 1) {
      return -1;
    } else {
      const nextVideo = playlist.videos.find(item => item.position === currentVideo.position + 1);

      return nextVideo.id;
    }
  }

  onVideoEnd = () => {
    const { history, playlist } = this.props;
    const nextVideoId = this.getNextVideoId(this.state.videoId);

    if (nextVideoId === -1) {
      history.push(`/playlist/${playlist.id}`);
    } else {
      this.setState({ videoId: nextVideoId });
    }
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';
    const currentVideo = isLoaded
      ? playlist.videos.find(item => item.id === this.state.videoId)
      : false;

    return (
      <Layout>
        {isLoaded && <VideoPlayer togglePlaylist={this.togglePlaylist} playlistUrl={`/playlist/${playlist.id}`} video={currentVideo} onVideoEnd={this.onVideoEnd} />}
        {isLoaded && this.state.showPlaylist && <Playlist togglePlaylist={this.togglePlaylist} videos={playlist.videos} />}
      </Layout>
    );
  }
}
export default PlayerPage;
