import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { THUMBNAIL_ROOT, NO_THUMBNAIL } from "../../constants";

const PlaylistItem = ({ id, url, title, description, playlist_thumbnail_url, duration, noVideos, category, onPlaylistClick, onBookmarkClick, big }) => (
  <div className={`o-grid__cell u-1/2@medium u-1/3@large ${big ? "" : "u-1/4@extralarge"} u-margin-bottom-large`} onClick={() => onPlaylistClick(url)}>
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
      {onBookmarkClick && <div className="c-video__bookmark" onClick={() => onBookmarkClick(id)}>❤️</div>}
      <span className="c-video__category"><Link to={`/category/${category.slug}`}>{category.name}</Link></span>
      <h4 className='c-video__title c-video__title--large'><Link onClick={onPlaylistClick(url)} to={`/playlist/${url}`}>{title}</Link></h4>
    </div>
  </div>
);


PlaylistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  playlist_thumbnail_url: PropTypes.string,
  category: PropTypes.object,
  noVideos: PropTypes.number,
  duration: PropTypes.string,
  onPlaylistClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  big: PropTypes.bool,
};

export default PlaylistItem;
