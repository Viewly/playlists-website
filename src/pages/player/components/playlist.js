import React from "react";
import { Link } from "react-router-dom";
import PlaylistItem from "./playlist_item";

const Playlist = ({ videos, togglePlaylist, isVisible, onClick }) => (
  <div onClick={onClick} className={`c-player-playlist ${isVisible ? 'is-visible' : ''}`}>

    <button className='c-btn c-player-playlist__btn-hide' onClick={togglePlaylist}>
      <svg className='o-icon' width='21' height='18' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
        <g stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M20 9H2M20 1H2M20 17H2M5 13L1 9l4-4'/>
        </g>
      </svg>
    </button>
    <div className='c-player-playlist__content'>
      {videos && videos.map((item, idx) => <PlaylistItem key={`video-${idx}`} {...item} />)}
    </div>
  </div>
)

export default Playlist;
