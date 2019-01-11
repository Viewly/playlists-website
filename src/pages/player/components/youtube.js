import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import KeyHandler, { KEYDOWN } from 'react-key-handler';

import {
  VIDEO_ENDED,
  VIDEO_PAUSED,
  VIDEO_PLAYING,
  YOUTUBE_ERROR_INVALID_VIDEO,
  YOUTUBE_ERROR_NO_EMBED,
  YOUTUBE_ERROR_NO_EMBED_TOO,
  YOUTUBE_ERROR_REMOVED,
  YOUTUBE_ERROR_UNPLAYABLE
} from "../../../constants/youtube_status";

class YoutubeComponent extends React.Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    onVideoEnd: PropTypes.func,
    onPercentage: PropTypes.func,
    logAction: PropTypes.func,
    resumeTime: PropTypes.number,
    percentage: PropTypes.number,
  };

  state = {
    currentState: -1,
    currentTime: 0
  };

  componentWillUnmount() {
    const { logAction } = this.props;

    this.timeUpdater && clearInterval(this.timeUpdater);
    logAction({ playback_state: 0, current_time: this.state.currentTime });
  }


  updateTime = (player) => {
    const oldTime = this.state.currentTime;
    let videotime = oldTime;

    if (player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
    }

    if (videotime !== oldTime) {
      this.setState({ currentTime: player.getCurrentTime() });
      this.onProgress(player);
    }
  };

  onReady = (evnt) => {
    const { resumeTime, percentage, logAction } = this.props;

    if (resumeTime && percentage !== 100) {
      evnt.target.seekTo(resumeTime);
      logAction({ current_time: resumeTime });
    }

    this.timeUpdater = setInterval(() => this.updateTime(evnt.target), 100);
  };

  onStateChange = (evnt) => {
    const { logAction, onVideoEnd } = this.props;
    const code = evnt.data;

    this.setState({ currentState: code });
    logAction({ playback_state: code, current_time: this.state.currentTime });
    code === VIDEO_ENDED && onVideoEnd();
  };

  onError = (evnt) => {
    const { logAction } = this.props;
    const code = evnt.data;
    let errorMessage;

    switch (code) {
      case YOUTUBE_ERROR_INVALID_VIDEO:
        errorMessage = "Invalid video id";
        break;

      case YOUTUBE_ERROR_REMOVED:
        errorMessage = "Video removed from Youtube";
        break;

      case YOUTUBE_ERROR_UNPLAYABLE:
        errorMessage = "Video cannot be played";
        break;

      case YOUTUBE_ERROR_NO_EMBED:
      case YOUTUBE_ERROR_NO_EMBED_TOO:
        errorMessage = "Video cannot be embedded";
        break;

      default:
        errorMessage = `Unknown error code "${code}"`;
    }

    console.error("Playback error", code, errorMessage);
    logAction({ error: `YOUTUBE_ERROR_${code}`, error_msg: errorMessage });
  };

  onProgress = (player) => {
    const { videoId, onPercentage } = this.props;

    const calculatedPercentage = this.calculatePercentage(this.state.currentTime, player.getDuration());
    onPercentage(calculatedPercentage, this.state.currentTime, videoId);
  };

  calculatePercentage = (current, max) => {
    return Math.round((current * 100) / max);
  };

  handleKeydown = (evnt) => {
    evnt.preventDefault();

    switch (evnt.code) {
      case "Space":
        this.togglePlay();
        break;
      case "ArrowLeft":
        this.videoSeek(-5);
        break;
      case "ArrowRight":
        this.videoSeek(5);
        break;
    }
  }

  togglePlay = async () => {
    const state = await this.ref.internalPlayer.getPlayerState();

    if (state === VIDEO_PLAYING) {
      this.ref.internalPlayer.pauseVideo();
    } else if (state === VIDEO_PAUSED) {
      this.ref.internalPlayer.playVideo();
    }
  }

  videoSeek = async (amount) => {
    const currentTime = await this.ref.internalPlayer.getCurrentTime();

    this.ref.internalPlayer.seekTo(currentTime + amount, true);
  }

  render() {
    const { videoId } = this.props;

    const opts = {
      playerVars: {
        autoplay: 1,
        rel: 0
      }
    };

    return (
      <>
        <KeyHandler
          keyEventName={KEYDOWN}
          code="Space"
          onKeyHandle={this.handleKeydown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          code="ArrowLeft"
          onKeyHandle={this.handleKeydown}
        />
        <KeyHandler
          keyEventName={KEYDOWN}
          code="ArrowRight"
          onKeyHandle={this.handleKeydown}
        />


        <YouTube
          ref={(ref) => this.ref = window.PP = ref}
          videoId={videoId}
          opts={opts}
          className="c-player__wrapper"
          containerClassName="c-player__container"
          onReady={this.onReady}
          onStateChange={this.onStateChange}
          onError={this.onError}
        />
      </>
    );
  }
}

export default YoutubeComponent;
