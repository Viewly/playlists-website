import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Youtube from "./youtube";

const VideoPlayer = ({ playlistUrl, video, onVideoEnd, onPercentage, logAction, focusMode }) => (
  <div className={`c-player ${focusMode ? 'c-player--focus-mode' : ''}`}>

    <div className='c-player__container'>
      {video && <Youtube videoId={video.video_id} logAction={logAction} percentage={video.percentage} resumeTime={video.currentTime} onVideoEnd={onVideoEnd} onPercentage={onPercentage} />}
    </div>

    <Link className='c-btn button-back' to={playlistUrl}><img className='o-icon o-icon--small' src={require("../../../images/icons/close.svg")} /></Link>
  </div>
);


VideoPlayer.propTypes = {
  playlistUrl: PropTypes.string.isRequired,
  video: PropTypes.object.isRequired,
  onVideoEnd: PropTypes.func.isRequired,
  logAction: PropTypes.func.isRequired,
  onPercentage: PropTypes.func.isRequired,
};

export default VideoPlayer;
