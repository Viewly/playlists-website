import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VideoPlayer from "./components/video";
import Playlist from "./components/playlist";
import SEO from "../../components/SEO";

import { playlistFetch, updatePercentage } from "../../actions";
import { LOADED } from "../../constants/status_types";
import { TriggerPlayerEvent, TriggerPlayerError } from "../../analytics";

const SEGMENT_LENGTH_SECONDS = 15;

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
  updatePercentage: (playlistId, videoId, percentage, currentTime) => dispatch(updatePercentage({ playlistId, videoId, percentage, currentTime }))
}))
class PlayerPage extends Component {
  static propTypes = {
    playlistFetch: PropTypes.func.isRequired,
    updatePercentage: PropTypes.func.isRequired,
    playlist: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
  }

  state = {
    videoId: null,
    showPlaylist: false,
    lastSegmentTime: 0,
    focusMode: false
  }

  componentDidMount() {
    const { playlist, playlistFetch, match: { params: { playlistId, videoId } } } = this.props;

    document && document.documentElement.classList.add("is-overflow-y-hidden");
    playlist.id !== playlistId && playlistFetch(playlistId);
    this.setState({ videoId: parseInt(videoId, 10) });
  }

  componentWillUnmount() {
    document && document.documentElement.classList.remove("is-overflow-y-hidden");
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
    const { playlist, updatePercentage, match: { params: { playlistId, videoId } } } = this.props;
    const currentVideo = playlist.videos.find(item => item.id === this.state.videoId);

    if ((percentage !== currentVideo.percentage) && (currentVideo.percentage !== 100)) {
      updatePercentage(playlist.id, this.state.videoId, percentage, currentTime);
    }

    if (this.state.lastSegmentTime === 0) {
      this.setState({ lastSegmentTime: currentTime });
    } else {
      if (currentTime > this.state.lastSegmentTime + SEGMENT_LENGTH_SECONDS) {
        TriggerPlayerEvent({
          playback_state: 1,
          segment_start: this.state.lastSegmentTime,
          segment_end: currentTime,
          playlist_id: playlistId,
          video_id: videoId
        });
        this.setState({ lastSegmentTime: currentTime });
      } else if (currentTime < this.state.lastSegmentTime) {
        this.setState({ lastSegmentTime: currentTime });
      }
    }
  }

  onPlaylistClick = (evnt) => {
    const classes = evnt.target.getAttribute("class") && evnt.target.getAttribute("class").split(" ") || [];
    classes.includes("c-player-playlist") && this.togglePlaylist();
  }

  logAction = (data) => {
    const { match: { params: { playlistId, videoId } } } = this.props;

    const payload = { playback_state: data.playback_state || -1, segment_start: this.state.lastSegmentTime, segment_end: data.current_time };
    data.current_time && this.setState({ lastSegmentTime: data.current_time });

    if (data.error) {
      TriggerPlayerError({ ...payload, playlist_id: playlistId, video_id: videoId });
    } else {
      TriggerPlayerEvent({ ...payload, playlist_id: playlistId, video_id: videoId });
    }
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = (playlist._status === LOADED) && this.state.videoId;
    const currentVideo = isLoaded
      ? playlist.videos.find(item => item.id === this.state.videoId)
      : false;

    return (
      <>
        {isLoaded && (
          <div className={`${this.state.focusMode ? 'container--focus-mode' : ''}`}>
            <SEO playlist={playlist} />
            <VideoPlayer
              togglePlaylist={this.togglePlaylist}
              playlistUrl={`/playlist/${playlist.url}`}
              video={currentVideo}
              focusMode={this.state.focusMode}
              onVideoEnd={this.onVideoEnd}
              logAction={this.logAction}
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

            <button
              className='c-btn button-focus'
              onClick={() => this.setState({ focusMode: !this.state.focusMode })}>
              {/*PRETTY FOCUS ({this.state.focusMode ? 'on' : 'off)'}*/}
              <img className='o-icon' src={require("../../images/icons/fullscreen.svg")} />
            </button>
          </div>
        )}
      </>
    );
  }
}
export default PlayerPage;
