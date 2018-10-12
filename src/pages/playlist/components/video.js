import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Video = ({ id, title, description, playlist_id, thumbnail_url }) => (
  <Link to={`/player/${playlist_id}/${id}`} styleName='video__container'>
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
  playlist_id: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired
};

export default Video;
