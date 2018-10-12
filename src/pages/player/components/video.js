import React from "react";
import { Link } from "react-router-dom";

import Plyr from "./plyr";

const VideoPlayer = ({ playlistUrl, video, togglePlaylist }) => (
  <div className='video__player'>
    <div className='video__player__top'>
      <Link to={playlistUrl}>&#10005;</Link>
      <button onClick={togglePlaylist}>playlist</button>
    </div>

    <div className='video__player__container'>
      {video && <Plyr videoId={video.video_id} />}
    </div>
  </div>
)

export default VideoPlayer;
