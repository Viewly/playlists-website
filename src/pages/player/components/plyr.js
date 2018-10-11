import React from "react";
import plyr from "plyr";

class PlyrComponent extends React.Component {
  componentDidMount() {
    const options = {
      autoplay: true,
      muted: true
    };

    this.player = plyr.setup('.plyr-player', options);
  }

  componentWillUnmount() {
    console.log('unmount');
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
