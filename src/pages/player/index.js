import React, { Component } from "react";
import { connect } from "react-redux";
import VideoPlayer from "./components/video";
import Playlist from "./components/playlist";
import SEO from "../../components/SEO";

import { playlistFetch, updatePercentage } from "../../actions";

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
  updatePercentage: (playlistId, videoId, percentage, currentTime) => dispatch(updatePercentage({ playlistId, videoId, percentage, currentTime }))
}))
class PlayerPage extends Component {
  state = {
    videoId: null,
    showPlaylist: false
  }

  componentDidMount() {
    const { playlist, playlistFetch, match: { params: { playlistId, videoId } } } = this.props;

    playlist.id !== playlistId && playlistFetch(playlistId);
    this.setState({ videoId: parseInt(videoId, 10) });
  }

  componentDidUpdate(prevProps) {
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
      history.push(`/playlist/${playlist.url}`);
    } else {
      history.push(`/player/${playlist.url}/${nextVideoId}`);
    }
  }

  onPercentage = (percentage, currentTime) => {
    const { playlist, updatePercentage } = this.props;
    const currentVideo = playlist.videos.find(item => item.id === this.state.videoId);

    if ((percentage !== currentVideo.percentage) && (currentVideo.percentage !== 100)) {
      updatePercentage(playlist.id, this.state.videoId, percentage, currentTime);
    }
  }

  onPlaylistClick = (evnt) => {
    const classes = evnt.target.getAttribute('class') && evnt.target.getAttribute('class').split(' ') || [];
    classes.includes('c-player-playlist') && this.togglePlaylist();
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';
    const currentVideo = isLoaded
      ? playlist.videos.find(item => item.id === this.state.videoId)
      : false;

    return (
      <>
        {isLoaded && (
          <>
            <SEO playlist={playlist} />
            <VideoPlayer
              togglePlaylist={this.togglePlaylist}
              playlistUrl={`/playlist/${playlist.url}`}
              video={currentVideo}
              onVideoEnd={this.onVideoEnd}
              onPercentage={this.onPercentage} />
            <Playlist
              onClick={this.onPlaylistClick}
              isVisible={this.state.showPlaylist}
              videoId={this.state.videoId}
              togglePlaylist={this.togglePlaylist}
              title={playlist.title}
              url={playlist.url}
              percentage={playlist.percentage}
              videos={playlist.videos} />
          </>
        )}
      </>
    );
  }
}
export default PlayerPage;
