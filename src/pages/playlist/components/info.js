import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "./header";
import Video from "./video";

import { sumVideoDurations } from "../../../utils";

@connect((state) => ({
  playlist: state.playlist
}))
export default class PlaylistInfo extends Component {
  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';

    if (!isLoaded) return <div>Loading ...</div>;

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
                <a href='#' className='c-btn c-btn--secondary'>Suggest a video</a>
                <a href='#' className='c-btn c-btn--primary u-margin-left-small'>Play all</a>
              </div>
            </div>
            <div className='o-grid'>
              {playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
