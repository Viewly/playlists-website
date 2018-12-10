import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { categoriesFetch, playlistFetch } from "../../../actions";
import { playlistAddVideo, playlistRemoveVideo, playlistUpdate, playlistVideosFetch } from "../../../actions/playlist";
import PlaylistName from "./formElements/playlistName";
import PlaylistCategory from "./formElements/playlistCategory";
import PlaylistThumbnail from "./formElements/playlistThumbnail";
import PlaylistDescription from "./formElements/playlistDescription";
import PlaylistHashtags from "./formElements/playlistHashtags";
import PlaylistAddVideos from "./formElements/playlistAddVideos";
import PlaylistVideoPreview from "./formElements/playlistVideoPreview";
import { set } from "lodash";
import { isLoaded } from "../../../utils";
import { OPEN_TOAST } from "../../../actions/toast";

@connect((state) => ({
  categories: state.categories,
  playlist: state.playlist,
}), (dispatch) => ({
  playlistFetch: (playlistId) => dispatch(playlistFetch({ playlistId })),
  playlistVideosFetch: (playlistId) => dispatch(playlistVideosFetch({ playlistId })),
  categoriesFetch: () => dispatch(categoriesFetch()),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),
  playlistUpdate: (data) => dispatch(playlistUpdate(data)),
  playlistAddVideo: (data) => dispatch(playlistAddVideo(data)),
  playlistRemoveVideo: (video_id, playlist_id) => dispatch(playlistRemoveVideo({ video_id, playlist_id })),
}))
class EditPlaylist extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    categories: PropTypes.object
  };

  state = {
    id: "",
    title: "",
    description: "",
    category: { id: 0 },
    playlist_thumbnail_url: "",
    hashtags: "",
    youtube_url: ""
  };

  componentDidMount() {
    const { categoriesFetch, playlist, playlistFetch, match: { params: { playlistId } } } = this.props;

    if (playlist.id === playlistId) {
      this.setState({ ...this.state, ...playlist }, () => {
        console.log("did mount state", this.state);
      });
    }

    categoriesFetch();

    playlistFetch(playlistId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playlist.id !== this.props.playlist.id) {
      this.setState({ ...this.state, ...this.props.playlist }, () => {
        console.log("did update state", this.state);
      });
    }
  }

  updateThumbnail = (playlist_thumbnail_url) => {
    this.setState({ playlist_thumbnail_url });
  };

  handleChange = (evnt) => {
    const field = evnt.target.name;
    const state = this.state;

    set(state, field, evnt.target.value);
    this.setState(state);
  };

  handleSubmit = async (evnt) => {
    const { playlistUpdate } = this.props;
    evnt.preventDefault();

    const response = await playlistUpdate({
      "id": this.state.id,
      "title": this.state.title,
      // "url": "string",
      "description": this.state.description,
      "category": this.state.category,
      // "hashtags": "",
      // "status": "",
      "playlist_thumbnail_url": this.state.playlist_thumbnail_url,
      // "publish_date": "playlist.status === 'published' ? new Date(): null"
    });

    console.log("DONE", response);
  };

  onAddVideo = async (video) => {
    const { openToast, playlistVideosFetch, playlistAddVideo, match: { params: { playlistId } } } = this.props;

    const response = await playlistAddVideo({ ...video, playlist_id: playlistId });
    if (response.success) {
      openToast({ type: 'info', message: "New video added to playlist" });
      playlistVideosFetch(playlistId);
    } else {
      openToast({ type: 'error', message: response.reason });
    }
  }

  onDelete = (videoId) => async () => {
    const { openToast, playlistRemoveVideo, match: { params: { playlistId } } } = this.props;

    await playlistRemoveVideo(videoId, playlistId);
    openToast({ type: 'info', message: "Video removed from playlist" });
  };

  render() {
    const { playlist, categories, match: { params: { playlistId } } } = this.props;
    const isReady = isLoaded(playlist);
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <form onSubmit={this.handleSubmit}>
          <div className="o-grid o-grid--center o-grid--large">

            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge'>
              <ul className='c-form__list c-form__list--large'>
                <PlaylistName value={this.state.title} onChange={this.handleChange}/>
                <PlaylistCategory categories={categories.data} value={this.state.category.id || 0}
                                  onChange={this.handleChange}/>
                <PlaylistThumbnail onChange={this.updateThumbnail}
                                   playlist_thumbnail_url={this.state.playlist_thumbnail_url}/>
                <PlaylistDescription value={this.state.description} onChange={this.handleChange}/>
                <PlaylistHashtags value={this.state.hashtags || ""} onChange={this.handleChange}/>
              </ul>
            </div>


            <div
              className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge u-margin-top-large u-margin-top-none@large'>

              <ul className='c-form__list c-form__list--large'>
                <PlaylistAddVideos onAddVideo={this.onAddVideo} playlistId={playlistId}/>
              </ul>

              <ul className='u-margin-top-large c-form__list c-form__list--small'>
                {isReady && playlist.videos.map(video => <PlaylistVideoPreview key={`video-${video.id}`} {...video}
                                                                               onDelete={this.onDelete}/>)}
              </ul>
            </div>
          </div>

          <div
            className='u-text-right u-horizontally-center u-margin-top u-margin-top-large@large u-4/5@medium u-1/1@large u-4/5@extralarge'>
            <hr className='u-margin-bottom'/>
            <button className='c-btn c-btn--secondary c-btn--hollow u-margin-right-small'>Save as draft</button>
            <button className='c-btn c-btn--secondary'>Publish</button>
          </div>
        </form>


      </div>
    );
  }
}

export default EditPlaylist;
