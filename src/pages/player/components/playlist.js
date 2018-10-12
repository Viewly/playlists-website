import React from "react";
import { Link } from "react-router-dom";
import PlaylistItem from "./playlist_item";

const Playlist = ({ videos, togglePlaylist }) => (
  <div className='playlist'>
    <button onClick={togglePlaylist}>X</button>

    <div className='playlist__container'>
    {videos && videos.map((item, idx) => <PlaylistItem key={`video-${idx}`} {...item} />)}
    </div>
  </div>
)

export default Playlist;
