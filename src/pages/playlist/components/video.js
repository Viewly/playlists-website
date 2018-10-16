import React from 'react';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Video = ({ id, title, description, playlist_id, thumbnail_url, percentage }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-1/4@extralarge u-margin-bottom'>
    <Link className={`c-video ${percentage === 100 ? 'is-watched' : ''}`} to={`/player/${playlist_id}/${id}`}>
      <div>
        <div className='c-thumbnail'>
          <div className='c-thumbnail__link'></div>
          <img className='c-thumbnail__img js-thumbnail-img' src={thumbnail_url} />
          <div className='c-thumbnail__play-icon'>
            <svg  width='16' height='22' viewBox='0 0 16 22' xmlns='http://www.w3.org/2000/svg'>
              <path d='M14.837 11.818L1.575 21.142A1 1 0 0 1 0 20.324V1.676A1 1 0 0 1 1.575.858l13.262 9.324a1 1 0 0 1 0 1.636z' fill='currentColor' fillRule='evenodd'/>
            </svg>
          </div>
          <span className='c-thumbnail__progress-bar'>
            <span className='c-thumbnail__progress-bar__line' style={{ width: `${percentage}%` }}></span>
          </span>
          <span className='c-thumbnail__duration-indicator'>6:55</span>
        </div>
        <h4 className='c-video__title'>{title}</h4>
      </div>
    </Link>
  </div>
)

Video.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired,
  progress: PropTypes.number
};

export default Video;
