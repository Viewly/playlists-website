import React, { Component } from "react";
import PropTypes from "prop-types";
import PlaylistItem from "./playlist_item";

export default class Playlist extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    videos: PropTypes.array,
    togglePlaylist: PropTypes.func.isRequired,
    isVisible: PropTypes.bool,
    percentage: PropTypes.number,
    onClick: PropTypes.func.isRequired,
    videoId: PropTypes.number.isRequired
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.isVisible && this.props.isVisible) {
      this.selectedPlaylist?.scrollIntoView({ behavior: "smooth" });
    }
  }

  render() {
    const { title, url, videos, togglePlaylist, isVisible, percentage, onClick, videoId } = this.props;

    return (
      <div onClick={onClick} className={`c-player-playlist ${isVisible ? "is-visible" : ""}`}>

        <button className='c-btn c-player-playlist__btn-hide' onClick={togglePlaylist}>
          <svg className='o-icon' width='21' height='18' viewBox='0 0 21 18' xmlns='http://www.w3.org/2000/svg'>
            <g stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round'
               strokeLinejoin='round'>
              <path d='M20 9H2M20 1H2M20 17H2M5 13L1 9l4-4'/>
            </g>
          </svg>
        </button>
        <div className='c-player-playlist__content'>
          <h2 className='u-h5 u-margin-bottom-tiny'>{title}</h2>
          <p className='c-progress-highlight u-margin-bottom-small'>{percentage}% watched</p>
          {videos && videos.map((item, idx) =>
            <div
              key={`video-${idx}`}
              ref={(ref) => {
                if (item.id === videoId) {
                  this.selectedPlaylist = ref;
                }
              }}
            >
              <PlaylistItem
                url={url}
                isCurrent={item.id === videoId}
                onPlayNext={togglePlaylist}
                {...item} />
            </div>
          )}
        </div>
      </div>

    );
  }
}
