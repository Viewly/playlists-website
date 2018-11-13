import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Plyr from "./plyr";

const VideoPlayer = ({ playlistUrl, video, onVideoEnd, onPercentage }) => (
  <div className='c-player'>
    <div>
      <div className='c-player__container'>
        {video && <Plyr videoId={video.video_id} percentage={video.percentage} resumeTime={video.currentTime} onVideoEnd={onVideoEnd} onPercentage={onPercentage} />}
      </div>

      <Link className='c-btn button-back' to={playlistUrl}>&times;  </Link>
    </div>

  </div>
);


VideoPlayer.propTypes = {
  playlistUrl: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired,
  onVideoEnd: PropTypes.func.isRequired,
  onPercentage: PropTypes.func.isRequired,
};

export default VideoPlayer;
