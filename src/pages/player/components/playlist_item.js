import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from '../layout.scss';

const PlaylistItem = ({ id, title, description, playlist_id, thumbnail_url }) => (
  <Link to={`/player/${playlist_id}/${id}`} styleName='playlist__item'>
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

export default CSSModules(PlaylistItem, styles);
