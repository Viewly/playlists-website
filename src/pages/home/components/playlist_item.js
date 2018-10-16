import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const THUMBNAIL_ROOT = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload';
const NO_THUMBNAIL = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/a6a9391c-2f46-3e9c-d3ef-7af0ea2297a9_thumbnail.png';

const PlaylistItem = ({ id, title, description, playlist_thumbnail_url }) => (
  <Link className='playlist__item' to={`/playlist/${id}`}>
    {playlist_thumbnail_url
      ? <img src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />
      : <img src={NO_THUMBNAIL} />
    }
    <div className='playlist__item__info'>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </Link>
);


PlaylistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_thumbnail_url: PropTypes.string,
};

export default PlaylistItem;
