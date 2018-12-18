import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Video from "./video";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";

@connect((state) => ({
  playlist: state.playlist,
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    const { playlist, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === LOADED) || (playlist.id === playlistId) || (playlist.url === playlistId);
    const isLoading = playlist._status === LOADING;
    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div className='o-grid'>
        {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
        {isLoading && <Loading />}
      </div>
    );
  }
}
