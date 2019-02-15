import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { THUMBNAIL_ROOT, NO_THUMBNAIL } from "../../constants";

const PlaylistItem = ({ id, url, title, description, playlist_thumbnail_url, percentage, duration, noVideos, category, onPlaylistClick, bookmarked, customClass }) => (
  <div className={`${customClass ? customClass : "o-grid__cell u-1/2@medium u-1/3@large u-margin-bottom-large"}`} onClick={() => onPlaylistClick(url)}>
    <div className='c-video'>
      <div className='c-thumbnail'>
        <Link onClick={onPlaylistClick(url)} className='c-thumbnail__link' to={`/playlist/${url}`} />
        {playlist_thumbnail_url
          ? <img className='c-thumbnail__img' src={`${THUMBNAIL_ROOT}/${playlist_thumbnail_url}`} />
          : <img className='c-thumbnail__img' src={require("../../images/playlist-thumbnail-default.jpg")} />
        }
        <p className='c-thumbnail__description'>{description}</p>
        <span className='c-thumbnail__total-videos'>{noVideos} videos</span>
        {percentage && (
          <span className="c-thumbnail__progress-bar">
            <span className="c-thumbnail__progress-bar__line" style={{ "width": `${percentage}%` }} />
          </span>
        )}
        {bookmarked && (
          <div className="c-thumbnail__bookmark">
            <img src={require("../../images/icons/bookmarked-indicator.svg")} />
          </div>
        )}

        <div className="c-thumbnail__premium">
          <img src={require("../../images/icons/lock.svg")} />
        </div>
      </div>
      <span className="c-link-category u-margin-top-small"><Link to={`/category/${category.slug}`}>{category.name}</Link></span>
      <h4 className='c-video__title c-video__title--large'><Link onClick={onPlaylistClick(url)} to={`/playlist/${url}`}>{title}</Link></h4>
    </div>
  </div>
);


PlaylistItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  description: PropTypes.string,
  playlist_thumbnail_url: PropTypes.string,
  category: PropTypes.object,
  noVideos: PropTypes.number,
  duration: PropTypes.string,
  percentage: PropTypes.number,
  onPlaylistClick: PropTypes.func,
  bookmarked: PropTypes.bool,
  customClass: PropTypes.string,
};

export default PlaylistItem;
