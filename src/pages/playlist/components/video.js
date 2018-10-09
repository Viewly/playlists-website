import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CSSModules from "react-css-modules";
import styles from '../layout.scss';

const Video = ({ id, title, description, playlistId, thumbnail_url }) => (
  <Link to={`/player/${playlistId}/${id}`} styleName='video__container'>
    <img src={thumbnail_url} />
    <div>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  </Link>
)

Video.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlistId: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired
};

export default CSSModules(Video, styles);
