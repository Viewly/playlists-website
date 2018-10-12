import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PlaylistItem = ({ id, title, description, playlist_id, thumbnail_url }) => (
  <Link to={`/player/${playlist_id}/${id}`} className='playlist__item'>
    <img src={thumbnail_url} />
    <h5>{title}</h5>
  </Link>
)

PlaylistItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired
};

export default PlaylistItem;
