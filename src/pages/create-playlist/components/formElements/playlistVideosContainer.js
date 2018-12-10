import React, { Component } from "react";
import PlaylistVideoPreview from "./playlistVideoPreview";

export default class PlaylistVideosContainer extends Component {
  render() {
    const { videos, onDelete } = this.props;

    return (
      <>
        {videos.map(video => (
          <PlaylistVideoPreview
            key={`video-${video.id}`} {...video}
            onDelete={onDelete}/>
        ))}
      </>
    );
  }
}
