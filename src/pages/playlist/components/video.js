import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Video = ({ id, title, description, playlist_id, thumbnail_url }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-1/4@extralarge'>
    <Link className='c-video' to={`/player/${playlist_id}/${id}`}>
      <div>
        <div class="c-thumbnail">
          <div class="c-thumbnail__link"></div>
          <img class="c-thumbnail__img js-thumbnail-img" src={thumbnail_url} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-poster="" class="c-thumbnail__play-icon"><path fill="currentColor" d="M1.425.35L14.575 8l-13.15 7.65V.35z"></path></svg>
          <span class="c-thumbnail__duration-indicator">6:55</span>
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
  thumbnail_url: PropTypes.string.isRequired
};

export default Video;
