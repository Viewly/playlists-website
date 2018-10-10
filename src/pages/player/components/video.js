import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";

import YouTube from "./youtube";
import styles from '../layout.scss';

const VideoPlayer = ({ playlistUrl, video, togglePlaylist }) => (
  <div styleName='video__player'>
    <div styleName='video__player__top'>
      <Link to={playlistUrl}>&#10005;</Link>
      <button onClick={togglePlaylist}>playlist</button>
    </div>

    <div styleName='video__player__container'>
      {video && <YouTube videoId={video.video_id} />}
    </div>

    <div styleName='video__player__controls'>
      <div>prev</div>
      <div>pause</div>
      <div>next</div>
    </div>
  </div>
)

export default CSSModules(VideoPlayer, styles);
