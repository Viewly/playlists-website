import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from '../layout.scss';

const VideoPlayer = ({ playlistUrl }) => (
  <div styleName='video__player'>
    <div styleName='video__player__top'>
      <Link to={playlistUrl}>&#10005;</Link>
      <span>playlist</span>
    </div>

    <div>

    </div>
    <div styleName='video__player__controls'>
      <div>prev</div>
      <div>pause</div>
      <div>next</div>
    </div>
  </div>
)

export default CSSModules(VideoPlayer, styles);
