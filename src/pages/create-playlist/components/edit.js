import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { categoriesFetch, playlistFetch } from "../../../actions";
import { playlistAddVideo, playlistRemoveVideo, playlistUpdate, playlistVideosFetch } from "../../../actions/playlist";
import PlaylistName from "./formElements/playlistName";
import PlaylistCategory from "./formElements/playlistCategory";
import PlaylistThumbnail from "./formElements/playlistThumbnail";
import PlaylistDescription from "./formElements/playlistDescription";
import PlaylistHashtags from "./formElements/playlistHashtags";
import PlaylistAddVideos from "./formElements/playlistAddVideos";
import { set } from "lodash";
import { isLoaded, slugUrl } from "../../../utils";
import { OPEN_TOAST } from "../../../actions/toast";
import PlaylistVideosContainer from "./formElements/playlistVideosContainer";

@withRouter
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
    url: "",
    description: "",
    category: { id: 0 },
    playlist_thumbnail_url: "",
    hashtags: "",
    youtube_url: ""
  };

  componentDidMount() {
    const { categoriesFetch, playlist, playlistFetch, match: { params: { playlistId } } } = this.props;

    if (playlist.id === playlistId) {
      this.setState({ ...this.state, ...playlist });
    }

    categoriesFetch();

    playlistFetch(playlistId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.playlist.id !== this.props.playlist.id) {
      this.setState({ ...this.state, ...this.props.playlist });
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
    evnt && evnt.preventDefault();

    const response = await playlistUpdate({
      "id": this.state.id,
      "title": this.state.title,
      "url": this.getSlug(),
      "description": this.state.description,
      "category": this.state.category,
      "hashtags": this.state.hashtags,
      "playlist_thumbnail_url": this.state.playlist_thumbnail_url,
    });

    return response;
  };

  previewPlaylist = async (evnt) => {
    const { history } = this.props;
    evnt && evnt.preventDefault();

    const response = await this.handleSubmit();
    history.push(`/playlist/${response.url}`);
  };

  saveAndShowAll = async (evnt) => {
    const { history } = this.props;
    evnt && evnt.preventDefault();

    await this.handleSubmit();
    history.push(`/my-playlists`);
  }

  onAddVideo = async (video) => {
    const { openToast, playlistVideosFetch, playlistAddVideo, match: { params: { playlistId } } } = this.props;

    if (!video) {
      openToast({ type: "error", message: "An error occured, please check the URL." });
    } else if (video.success === false) {
      openToast({ type: "error", message: video.reason });
    } else {
      const response = await playlistAddVideo({ ...video, playlist_id: playlistId });

      if (response.success) {
        playlistVideosFetch(playlistId);
      } else {
        openToast({ type: "error", message: response.reason });
      }
    }
  };

  onDelete = (videoId) => async () => {
    const { playlistRemoveVideo, match: { params: { playlistId } } } = this.props;

    await playlistRemoveVideo(videoId, playlistId);
  };

  getSlug = () => {
    return slugUrl(this.state.id, this.state.title);
  };

  changeHashtags = (hashtags) => {
    this.setState({ "hashtags": hashtags.map(item => item.name).join(" ") });
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
                <PlaylistHashtags value={this.state.hashtags || ""} onChange={this.changeHashtags}/>
              </ul>
            </div>


            <div
              className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge u-margin-top-large u-margin-top-none@large'>

              <ul className='c-form__list c-form__list--large'>
                <PlaylistAddVideos onAddVideo={this.onAddVideo} playlistId={playlistId}/>
              </ul>

              <ul className='u-margin-top-large c-form__list c-form__list--small'>
                {isReady &&
                <PlaylistVideosContainer playlistId={playlistId} videos={playlist.videos} onDelete={this.onDelete}/>}
              </ul>
            </div>
          </div>

          <div
            className='u-horizontally-center u-margin-top u-margin-top-large@large u-4/5@medium u-1/1@large u-4/5@extralarge'>
            <hr className='u-margin-bottom'/>
            <div className='o-grid o-grid--auto o-grid--small o-grid--middle o-grid--right'>
              {/*<div className='o-grid__cell'>
                <button className='c-btn c-btn--plain c-btn--danger c-btn--with-icon c-btn--delete-playlist'>
                  <img className='o-icon o-icon--small u-margin-right-tiny' src={require("../../../images/icons/delete.svg")} />
                  <span className='c-btn__label'>Delete playlist</span>
                </button>
              </div>*/}
              <div className='o-grid__cell'>
                <button
                  onClick={this.previewPlaylist}
                  className='c-btn c-btn--secondary c-btn--hollow u-margin-right-small'>
                  Preview
                </button>
                {/*<button className='c-btn c-btn--secondary c-btn--hollow u-margin-right-small'>Save as draft</button>*/}
                {/*<button className='c-btn c-btn--secondary'>Publish</button>*/}
                <button onClick={this.saveAndShowAll} className='c-btn c-btn--secondary'>Save</button>
              </div>
            </div>
          </div>
        </form>


      </div>
    );
  }
}

export default EditPlaylist;
