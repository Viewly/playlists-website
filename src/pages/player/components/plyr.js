import React from "react";
import PropTypes from "prop-types";
import plyr from "plyr";
import { VIDEO_ENDED } from "../../../constants/youtube_status";

class PlyrComponent extends React.Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    onVideoEnd: PropTypes.func,
    onPercentage: PropTypes.func,
    logAction: PropTypes.func,
    resumeTime: PropTypes.number,
    percentage: PropTypes.number,
  }

  componentDidMount() {
    const options = {
      autoplay: true,
      invertTime: false,
      settings: ["speed"],
      keyboard: { global: true },
      playsinline: true
    };

    this.player = plyr.setup(".plyr-player", options);

    this.player[0].on("timeupdate", this.handleEvent);
    this.player[0].on("statechange", this.handleEvent);
    this.player[0].on("ready", this.handleEvent);
    this.player[0].on("error", this.handleEvent);
  }

  componentWillUnmount() {
    const { logAction } = this.props;

    logAction({ playback_state: 0, current_time: this.player[0].currentTime });
    if (this.player.length > 0) {
      for (const playerEl of this.player) {
        playerEl.destroy();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      this.player[0].source = {
        type: "video",
        sources: [
          {
            src: this.props.videoId,
            provider: "youtube",
          },
        ],
      };
    }
  }

  handleEvent = (evnt) => {
    const { onVideoEnd, onPercentage, videoId, resumeTime, percentage, logAction } = this.props;

    switch (evnt.type) {
      case "statechange": {
        const code = evnt.detail.code;
        logAction({ playback_state: code, current_time: this.player[0].currentTime });
        code === VIDEO_ENDED && onVideoEnd();
        break;
      }
      case "timeupdate": {
        const calculatedPercentage = this.calculatePercentage(this.player[0].currentTime, this.player[0].duration);
        onPercentage(calculatedPercentage, this.player[0].currentTime, videoId);
        break;
      }
      case "ready": {
        this.player[0].play();
        if (resumeTime && percentage !== 100) {
          this.player[0].currentTime = resumeTime;
          logAction({ current_time: resumeTime });
        }
        break;
      }
      case "error": {
        logAction({ error: `YOUTUBE_ERROR_${evnt.detail.code}`, error_msg: evnt.detail.message });
        break;
      }
      default:
        break;
    }
  }

  calculatePercentage = (current, max) => {
    return Math.round((current * 100) / max);
  }

  render() {
    const { videoId } = this.props;

    return (
      <div
        className="plyr-player"
        data-plyr-provider="youtube"
        data-plyr-embed-id={videoId} />
    );
  }
}

export default PlyrComponent;
