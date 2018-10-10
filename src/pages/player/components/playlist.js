import React from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from '../layout.scss';
import PlaylistItem from "./playlist_item";

const Playlist = ({ videos, togglePlaylist }) => (
  <div styleName='playlist'>
    <button onClick={togglePlaylist}>X</button>

    <div styleName='playlist__container'>
    {videos && videos.map((item, idx) => <PlaylistItem key={`video-${idx}`} {...item} />)}
    </div>
  </div>
)

export default CSSModules(Playlist, styles);
