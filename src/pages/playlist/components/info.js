import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "./header";
import Video from "./video";
import SharePlaylist from "./share";

import { sumVideoDurations } from "../../../utils";

@connect((state) => ({
  playlist: state.playlist
}))
export default class PlaylistInfo extends Component {
  render() {
    const { playlist, match: { params: { playlistId } } } = this.props;
    const isLoaded = (playlist._status === 'LOADED') || (playlist.id === playlistId);
    const isLoading = playlist._status === 'LOADING';
    if (!isLoaded) return <div>Loading ...</div>;
    const firstVideo = playlist.videos.find(item => item.position === 0);

    return (
      <div>
        <Header
          title={playlist.title}
          author={playlist.user_id}
          duration={sumVideoDurations(playlist.videos)}
          poster={playlist.playlist_thumbnail_url}
          description={playlist.description}
          tags={[ playlist.category ]} />

        <div className='c-section c-section--grey'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--auto o-grid--middle o-grid--between'>
              <div className='o-grid__cell u-margin-bottom'>
                <span><b>{playlist.videos.length} videos</b></span>
              </div>
              <div className='o-grid__cell u-margin-bottom'>
                <SharePlaylist playlist={playlist} />
                <Link to={`/playlist/${playlist.id}/suggest`} className='c-btn c-btn--secondary'>Suggest a video</Link>
                {firstVideo && <Link to={`/player/${playlist.id}/${firstVideo.id}`} className='c-btn c-btn--primary u-margin-left-small'>Play all</Link>}
              </div>
            </div>
            <div className='o-grid'>
              {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} {...item} />)}
              {isLoading && (
                <div>Loading ...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
