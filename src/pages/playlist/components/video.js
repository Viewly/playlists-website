import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertYoutubeDuration } from "../../../utils";

const Video = ({ id, title, duration, url, thumbnail_url, percentage }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-1/4@extralarge u-margin-bottom'>

    <div className={`c-video c-video--condensed ${percentage === 100 ? "is-watched" : ""}`}>
      <div className='c-thumbnail'>
        <Link className='c-thumbnail__link' to={`/player/${url}/${id}`}></Link>
        <img className='c-thumbnail__img' src={thumbnail_url} />
        <div className='c-thumbnail__play-icon'>
          <svg  width='16' height='22' viewBox='0 0 16 22' xmlns='http://www.w3.org/2000/svg'>
            <path d='M14.837 11.818L1.575 21.142A1 1 0 0 1 0 20.324V1.676A1 1 0 0 1 1.575.858l13.262 9.324a1 1 0 0 1 0 1.636z' fill='currentColor' fillRule='evenodd'/>
          </svg>
        </div>
        {percentage !== 100 && percentage > 0 &&
          <span className='c-thumbnail__progress-bar'>
            <span className='c-thumbnail__progress-bar__line' style={{ width: `${percentage}%` }}></span>
          </span>
        }

        {percentage === 100 &&
          <span className='c-thumbnail__checkmark'>
            <svg className='o-icon o-icon--small' width="11" height="8" viewBox="0 0 11 8" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1L3.143 7 1 4.818" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        }

        <span className='c-thumbnail__duration-indicator'>{convertYoutubeDuration(duration)}</span>
      </div>
      <div className='c-video--condensed__text'>
        <h4 className='c-video__title'><Link to={`/player/${url}/${id}`}>{title}</Link></h4>
        <span className='c-video--condensed__duration'>{convertYoutubeDuration(duration)}</span>
      </div>
    </div>
  </div>
);

Video.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.string,
  id: PropTypes.number,
  url: PropTypes.string,
  percentage: PropTypes.number,
  description: PropTypes.string,
  playlist_id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired,
  progress: PropTypes.number
};

export default Video;
