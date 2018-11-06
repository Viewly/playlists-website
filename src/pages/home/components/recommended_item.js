import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const THUMBNAIL_ROOT = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload';
const NO_THUMBNAIL = 'https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/a6a9391c-2f46-3e9c-d3ef-7af0ea2297a9_thumbnail.png';

const RecommendedItem = ({ url, title, description, playlist_thumbnail_url, duration, noVideos, category, onPlaylistClick }) => (
  <div className='o-grid__cell u-1/2@medium u-1/3@large u-margin-bottom-large'>
    <div className='c-video'>
      <div className='c-thumbnail'>
        <Link onClick={onPlaylistClick(url)} className='c-thumbnail__link' to={`/playlist/${url}`}></Link>
        {playlist_thumbnail_url
          ? <img className='c-thumbnail__img' src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />
          : <img className='c-thumbnail__img' src={NO_THUMBNAIL} />
        }
        <p className='c-thumbnail__description c-video__description'>{description}</p>
        <span className='c-thumbnail__total-videos'>{noVideos} videos</span>
        <span className='c-thumbnail__duration-indicator'>{duration}</span>
      </div>
      <span className="c-video__category"><Link to={`/category/${category.slug}`}>{category.name}</Link></span>
      <h4 className='c-video__title c-video__title--large'><Link onClick={onPlaylistClick(url)} to={`/playlist/${url}`}>{title}</Link></h4>
    </div>
  </div>
);


RecommendedItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_thumbnail_url: PropTypes.string,
  category: PropTypes.object,
  noVideos: PropTypes.number,
  duration: PropTypes.string,
  onPlaylistClick: PropTypes.func,
};

export default RecommendedItem;
