import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { categoriesFetch } from "../../../actions";
import { playlistCreate } from "../../../actions/playlist";
import PlaylistName from "./formElements/playlistName";
import PlaylistCategory from "./formElements/playlistCategory";
import PlaylistDescription from "./formElements/playlistDescription";
// import PlaylistThumbnail from "./formElements/playlistThumbnail";
// import PlaylistHashtags from "./formElements/playlistHashtags";

@withRouter
@connect((state) => ({
  categories: state.categories
}), (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch()),
  playlistCreate: (data) => dispatch(playlistCreate(data))
}))
class NewPlaylist extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    categories: PropTypes.object
  };

  state = {
    playlist_id: "",
    title: "",
    description: "",
    category: { id: 0 },
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
    const { history, playlistCreate } = this.props;
    evnt.preventDefault();

    const response = await playlistCreate({
      "title": this.state.title,
      "url": "string",
      "description": this.state.description,
      "category": {
        id: parseInt(this.state.category, 10)
      },
      "hashtags": "",
      // "status": "",
      "playlist_thumbnail_url": "url",
      // "publish_date": "playlist.status === 'published' ? new Date(): null"
    });

    history.push(`/create-playlist/${response.id}`);
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <form onSubmit={this.handleSubmit}>
          <div className="o-grid o-grid--center o-grid--large">
            <div className='o-grid__cell u-4/5@medium u-1/2@large u-2/5@extralarge'>
              <ul className='c-form__list c-form__list--large'>
                <PlaylistName value={this.state.title} onChange={this.handleChange} />
                <PlaylistCategory categories={categories.data} value={this.state.category_id} onChange={this.handleChange} />
                {/*<PlaylistThumbnail />*/}
                <PlaylistDescription value={this.state.description} onChange={this.handleChange} />
                {/*<PlaylistHashtags value={this.state.hashtags} onChange={this.handleChange} />*/}
              </ul>
            </div>
          </div>

          <div className='u-text-right u-horizontally-center u-margin-top u-margin-top-large@large u-4/5@medium u-1/1@large u-4/5@extralarge'>
            <hr className='u-margin-bottom' />
            <button className='c-btn c-btn--secondary'>Next</button>
          </div>
        </form>


      </div>
    );
  }
}

export default NewPlaylist;
