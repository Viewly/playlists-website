import React from "react";
import PropTypes from "prop-types";

import PlaylistItem from "./playlist_item";

const Playlist = ({ isLoaded, data }) => (
  <div class='o-grid'>
    {isLoaded && data.map((item, idx) => <PlaylistItem key={`playlistitem-${idx}`} {...item} />)}
    {!isLoaded && <div>LOADING</div>}
  </div>
);


Playlist.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired
};

export default Playlist;
