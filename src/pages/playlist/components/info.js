import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./header";
import Video from "./video";

@connect((state) => ({
  playlist: state.playlist
}))
export default class PlaylistInfo extends Component {
  render() {
    const { playlist, match: { params: { playlistId } } } = this.props;
    const isLoaded = playlist._status === 'LOADED';

    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div>
        <Header title={playlist.title} author={playlist.user_id} />

        {playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} playlistId={playlistId} {...item} />)}
      </div>
    );
  }
}
