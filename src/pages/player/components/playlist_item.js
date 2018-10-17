import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertYoutubeDuration } from "../../../utils"

const PlaylistItem = ({ id, title, duration, playlist_id, thumbnail_url, percentage, onPlayNext, isCurrent }) => (

  <div className={`c-video ${isCurrent ? 'is-current' : ''} ${percentage === 100 ? 'is-watched' : ''}`}>
    <div className='c-thumbnail'>
      <Link className='c-thumbnail__link' onClick={onPlayNext} to={`/player/${playlist_id}/${id}`}></Link>
      <img className='c-thumbnail__img' src={thumbnail_url} />
      <div className='c-thumbnail__play-icon'>
        <svg  width='16' height='22' viewBox='0 0 16 22' xmlns='http://www.w3.org/2000/svg'>
          <path d='M14.837 11.818L1.575 21.142A1 1 0 0 1 0 20.324V1.676A1 1 0 0 1 1.575.858l13.262 9.324a1 1 0 0 1 0 1.636z' fill='currentColor' fillRule='evenodd'/>
        </svg>
      </div>
      {percentage !== 100 &&
        <span className='c-thumbnail__progress-bar'>
          <span className='c-thumbnail__progress-bar__line' style={{ width: `${percentage}%` }}></span>
        </span>
      }

      {percentage === 100 &&
        <span className='c-thumbnail__checkmark'>
          <svg className='o-icon o-icon--small' width="11" height="8" viewBox="0 0 11 8" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L3.143 7 1 4.818" stroke="currentColor" stroke-width="2" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      }
      <span className='c-thumbnail__duration-indicator'>{convertYoutubeDuration(duration)}</span>
    </div>
    <h4 className='c-video__title'><Link onClick={onPlayNext} to={`/player/${playlist_id}/${id}`}>{title}</Link></h4>
  </div>
)

PlaylistItem.propTypes = {
  title: PropTypes.string.isRequired,
  playlist_id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired,
  onPlayNext: PropTypes.func.isRequired
};

export default PlaylistItem;
