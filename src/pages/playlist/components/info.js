import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Header from "./header";
import Video from "./video";
import SharePlaylist from "./share";
import SEO from "../../../components/SEO";

import { sumVideoDurations } from "../../../utils";
import Loading from "../../../components/loading";
import { LOADED, LOADING } from "../../../constants/status_types";

@connect((state) => ({
  playlist: state.playlist
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
      <div>
        <Header
          title={playlist.title}
          author={playlist.user_id}
          duration={sumVideoDurations(playlist.videos)}
          poster={playlist.playlist_thumbnail_url}
          description={playlist.description}
          hashtags={playlist.hashtags && playlist.hashtags.split(" ") || []}
          category={playlist.category} />

        <SEO playlist={playlist} />
        <div className='c-section c-section--grey'>
          <div className='o-wrapper'>
            <div className='o-grid o-grid--small o-grid--auto o-grid--middle o-grid--between u-margin-bottom u-margin-bottom-small@large'>
              <div className='o-grid__cell u-margin-bottom'>
                <span><b>{playlist.videos.length} videos</b></span>
              </div>
              <div className='o-grid__cell u-margin-bottom'>
                <SharePlaylist playlist={playlist} />
                <Link to={`/playlist/${playlist.id}/suggest`} className='c-btn c-btn--primary u-margin-left'>Suggest a video</Link>
              </div>
            </div>
            <div className='o-grid'>
              {!isLoading && playlist.videos && playlist.videos.map((item, idx) => <Video key={`video-${idx}`} url={playlist.url} {...item} />)}
              {isLoading && <Loading />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
