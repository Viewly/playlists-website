import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Video = ({ id, title, description, playlist_id, thumbnail_url }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-1/4@extralarge u-margin-bottom'>
  <Link to={`/player/${playlist_id}/${id}`}>
    <img src={thumbnail_url} />
    <div>
      <h5>{title}</h5>
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
