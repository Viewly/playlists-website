import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const THUMBNAIL_ROOT = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload';
const NO_THUMBNAIL = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/a6a9391c-2f46-3e9c-d3ef-7af0ea2297a9_thumbnail.png';

const PlaylistItem = ({ id, title, description, playlist_thumbnail_url }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-1/4@extralarge u-margin-bottom'>
    <Link className='c-video' to={`/playlist/${id}`}>
      <div>
        <div className='c-thumbnail'>
          <div className='c-thumbnail__link'></div>
          {playlist_thumbnail_url
            ? <img className='c-thumbnail__img' src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />
            : <img className='c-thumbnail__img' src={NO_THUMBNAIL} />
          }
          <p className='c-thumbnail__description c-video__description'>{description}</p>
          <span className='c-thumbnail__duration-indicator'>6:55</span>
        </div>
        <h4 className='c-video__title'>{title}</h4>
      </div>
    </Link>
  </div>
);


PlaylistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_thumbnail_url: PropTypes.string,
};

export default PlaylistItem;
