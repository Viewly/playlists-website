import React from "react";
import PropTypes from "prop-types";

import PlaylistItem from "./playlist_item";

const Playlist = ({ isLoaded, data, onPlaylistClick, title }) => (
  <div className='u-margin-top-small'>
    <h2>{title}</h2>
    <div className='o-grid'>
      {isLoaded && data.map((item, idx) => <PlaylistItem key={`playlistitem-${idx}`} onPlaylistClick={onPlaylistClick} {...item} />)}
      {!isLoaded && <div>LOADING</div>}
    </div>
  </div>
);

Playlist.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onPlaylistClick: PropTypes.func,
  data: PropTypes.array.isRequired
};

Playlist.defaultProps = {
  title: "Latest playlists"
}

export default Playlist;
