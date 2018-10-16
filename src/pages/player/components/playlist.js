import React from "react";
import { Link } from "react-router-dom";
import PlaylistItem from "./playlist_item";

const Playlist = ({ videos, togglePlaylist, isVisible }) => (
  <div className={`c-player-playlist ${isVisible ? 'c-player-playlist--visible' : 'c-player-playlist--hidden'}`}>
    <button className='c-btn c-player-playlist__btn-hide' onClick={togglePlaylist}>
      <svg className='o-icon' width='24' height='18' viewBox='0 0 24 18' xmlns='http://www.w3.org/2000/svg'>
        <g stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
          <path d='M23 9H13M23 1H5M23 17H5M5 13l4-4-4-4M9 9H1'/>
        </g>
      </svg>
    </button>

    <div className='c-player-playlist__content'>
      {videos && videos.map((item, idx) => <PlaylistItem key={`video-${idx}`} {...item} />)}
    </div>
  </div>
)

export default Playlist;
