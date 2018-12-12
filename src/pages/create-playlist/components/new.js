import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { categoriesFetch } from "../../../actions";
import { playlistCreate } from "../../../actions/playlist";
import PlaylistName from "./formElements/playlistName";
import PlaylistCategory from "./formElements/playlistCategory";
import { set } from "lodash";

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
    title: "",
    category: { id: 0 },
    thumbnail_url: ""
  };

  componentDidMount() {
    const { categoriesFetch } = this.props;

    categoriesFetch();
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;
    const state = this.state;

    set(state, field, evnt.target.value);
    this.setState(state);
  };

  handleSubmit = async (evnt) => {
    const { history, playlistCreate } = this.props;
    evnt.preventDefault();

    const response = await playlistCreate({
      "title": this.state.title,
      "category_id": parseInt(this.state.category.id, 10),
      "category": this.state.category,
      "description": ""
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
                <PlaylistCategory categories={categories.data} value={this.state.category.id} onChange={this.handleChange} />
                <li className='u-text-right'>
                  <button className='c-btn c-btn--secondary'>Next</button>
                </li>
              </ul>
            </div>
          </div>

        </form>


      </div>
    );
  }
}

export default NewPlaylist;
