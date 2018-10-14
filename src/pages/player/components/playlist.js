import React from "react";
import { Link } from "react-router-dom";
import PlaylistItem from "./playlist_item";

const Playlist = ({ videos, togglePlaylist }) => (
  <div className='c-player-playlist'>
    <button onClick={togglePlaylist}>X</button>

    <div className='c-player-playlist__content'>
    {videos && videos.map((item, idx) => <PlaylistItem key={`video-${idx}`} {...item} />)}
    </div>
  </div>
)

export default Playlist;
