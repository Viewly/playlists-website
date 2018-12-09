import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { categoriesFetch } from "../../../actions";
import { playlistCreate } from "../../../actions/playlist";
import PlaylistName from "./formElements/playlistName";
import PlaylistCategory from "./formElements/playlistCategory";
import PlaylistThumbnail from "./formElements/playlistThumbnail";
import PlaylistDescription from "./formElements/playlistDescription";
import PlaylistHashtags from "./formElements/playlistHashtags";
import PlaylistAddVideos from "./formElements/playlistAddVideos";
import PlaylistVideoPreview from "./formElements/playlistVideoPreview";

@connect((state) => ({
  categories: state.categories
}), (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch()),
  playlistCreate: (data) => dispatch(playlistCreate(data))
}))
class EditPlaylist extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    categories: PropTypes.object
  };

  state = {
    playlist_id: "",
    playlist_name: "",
    description: "",
    category_id: "0",
    thumbnail_url: "",
    hashtags: "",
    youtube_url: ""
  };

  componentDidMount() {
    const { categoriesFetch } = this.props;

    categoriesFetch();
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  };

  handleSubmit = async (evnt) => {
    const { playlistCreate } = this.props;
    evnt.preventDefault();
    // alert("Submit");

    const response = await playlistCreate({
      "title": this.state.playlist_name,
      "url": "string",
      "description": this.state.description,
      "category_id": this.state.category_id,
      "hashtags": "",
      // "status": "",
      "playlist_thumbnail_url": "url",
      // "publish_date": "playlist.status === 'published' ? new Date(): null"
    });

    console.log("DONE", response);
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <form onSubmit={this.handleSubmit}>
          <div className="o-grid o-grid--center o-grid--large">

            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge'>
              <ul className='c-form__list c-form__list--large'>
                <PlaylistName value={this.state.playlist_name} onChange={this.handleChange} />
                <PlaylistCategory categories={categories.data} value={this.state.category} onChange={this.handleChange} />
                <PlaylistThumbnail />
                <PlaylistDescription value={this.state.description} onChange={this.handleChange} />
                <PlaylistHashtags value={this.state.hashtags} onChange={this.handleChange} />
              </ul>
            </div>


            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge u-margin-top-large u-margin-top-none@large'>

              <ul className='c-form__list c-form__list--large'>
                <PlaylistAddVideos />
              </ul>

              <ul className='u-margin-top-large c-form__list c-form__list--small'>
                <PlaylistVideoPreview />
                <PlaylistVideoPreview />
                <PlaylistVideoPreview />
                <PlaylistVideoPreview />
              </ul>
            </div>
          </div>

          <div className='u-text-right u-horizontally-center u-margin-top u-margin-top-large@large u-4/5@medium u-1/1@large u-4/5@extralarge'>
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
