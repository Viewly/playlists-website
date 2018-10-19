import React from "react";
import PropTypes from "prop-types";

import RecommendedItem from "./recommended_item";

const Playlist = ({ isLoaded, data, onPlaylistClick }) => (
  <div>
    <h2>Staff picks</h2>
    <div className='o-grid'>
      {isLoaded && data.map((item, idx) => <RecommendedItem key={`playlistitem-${idx}`} onPlaylistClick={onPlaylistClick} {...item} />)}
      {!isLoaded && <div>LOADING</div>}
    </div>
  </div>
);


Playlist.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
};

export default Playlist;
