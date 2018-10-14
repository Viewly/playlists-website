import React from "react";
import { Link } from "react-router-dom";

import Plyr from "./plyr";

const VideoPlayer = ({ playlistUrl, video, togglePlaylist }) => (
  <div className='video__player'>
    <div className='video__player__top'>
      <Link to={playlistUrl}>&#10005;</Link>
      <button className='c-btn show-playlist' onClick={togglePlaylist}>
        <svg className='o-icon' width='21' height='18' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
          <g stroke='currentColor' stroke-width='2' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'>
            <path d='M20 9H2M20 1H2M20 17H2M5 13L1 9l4-4'/>
          </g>
        </svg>
      </button>
    </div>

    <div className='video__player__container'>
      {video && <Plyr videoId={video.video_id} />}
    </div>
  </div>
)

export default VideoPlayer;
