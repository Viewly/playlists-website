import React from "react";
import plyr from "plyr";
import { VIDEO_ENDED } from "../../../constants/youtube_status";

class PlyrComponent extends React.Component {
  componentDidMount() {
    const options = {
      autoplay: true,
      invertTime: false,
      settings: ['speed'],
      keyboard: { global: true }
    };

    this.player = plyr.setup('.plyr-player', options);

    this.player[0].on('timeupdate', this.handleEvent)
    this.player[0].on('statechange', this.handleEvent)
    this.player[0].on('ready', this.handleEvent)
  }

  componentWillUnmount() {
    if (this.player.length > 0) {
      for (const playerEl of this.player) {
        playerEl.destroy();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoId !== this.props.videoId) {
      this.player[0].source = {
        type: 'video',
        sources: [
          {
            src: this.props.videoId,
            provider: 'youtube',
          },
        ],
      }
    }
  }

  handleEvent = (evnt) => {
    const { onVideoEnd, onPercentage, videoId, resumeTime, percentage } = this.props;

    switch (evnt.type) {
      case 'statechange':
        const code = evnt.detail.code;
        code === VIDEO_ENDED && onVideoEnd();
        break;
      case 'timeupdate':
        const calculatedPercentage = this.calculatePercentage(this.player[0].currentTime, this.player[0].duration);
        onPercentage(calculatedPercentage, this.player[0].currentTime, videoId)
        break;
      case 'ready':
        if (resumeTime && percentage !== 100) {
          this.player[0].currentTime = resumeTime;
        }
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
