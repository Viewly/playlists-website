import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { categoriesFetch } from "../../actions";

@connect((state) => ({
  categories: state.categories
}), (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch())
}))
class CreatePlaylist extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    categories: PropTypes.object
  };

  state = {
    playlist_name: "",
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
    evnt.preventDefault();
    alert("Submit");
  };

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <form onSubmit={this.handleSubmit}>

          <div className="o-grid o-grid--center o-grid--huge o-grid--auto">

            <ul className='o-grid__cell c-form__list c-form__list--large'>
              <li>
                <label className='c-form__label'>Playlist name</label>
                <input
                  className='c-input c-input--primary'
                  type="text"
                  name="playlist_name"
                  value={this.state.playlist_name}
                  onChange={this.handleChange}
                  required/>
              </li>

              <li>
                <label className='c-form__label'>Playlist thumbnail</label>
                <div>
                  drag and drop here or browse
                </div>
              </li>

              <li>
                <label className='c-form__label'>Category</label>
                <div className='c-select u-1/1'>
                  <select
                    className='c-select__select'
                    name="category"
                    value={this.state.category}
                    onChange={this.handleChange}>

                    <option value="0">No category</option>
                    {categories.data.map((item, idx) => (
                      <option key={`category-${idx}`} value={item.id}>{item.name}</option>
                    ))}

                  </select>
                </div>
              </li>

              <li>
                <label className='c-form__label'>Hashtags</label>
                <input
                  className='c-input c-input--primary'
                  type="text"
                  name="hashtags"
                  value={this.state.hashtags}
                  onChange={this.handleChange}
                  required/>
              </li>

              <li className='u-text-right'>
                <button className='c-btn c-btn--secondary'>Next</button>
              </li>
            </ul>

            <ul className='o-grid__cell c-form__list c-form__list--large'>
              <li>
                <label className='c-form__label'>Playlist name</label>
                <input
                  className='c-input c-input--primary'
                  type="text"
                  name="playlist_name"
                  value={this.state.playlist_name}
                  onChange={this.handleChange}
                  required/>
              </li>

              <li>
                video
              </li>
              <li>
                video
              </li>
              <li>
                video
              </li>
              <li>
                video
              </li>
            </ul>
          </div>
        </form>


      </div>
    );
  }
}

export default CreatePlaylist;
