import React, { Component } from 'react';
import ReactYouTube from 'react-youtube';

export default class YouTube extends Component {
  _onReady(event) {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  }

  render() {
    const { videoId } = this.props;
    const opts = {
      height: '100%',
      width: '100%',
      playerVars: {
        autoplay: 1,
        controls: 0,
        playsinline: 1, // ios inline play
        showinfo: 0,
        modestbranding: 0
      }
    };

    return (
      <ReactYouTube
        videoId={videoId}
        opts={opts}
        onReady={this._onReady}
      />
    );
  }
}
