import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";

import { playlistCreateNew } from "../../actions";

@connect(null, (dispatch) => ({
  playlistCreateNew: (title, description, email, category) => dispatch(playlistCreateNew({ title, description, email, category })),
}))
class NewPlaylist extends Component {
  state = {
    title: '',
    description: '',
    email: '',
    category: '0',
    suggested: false
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { playlistCreateNew } = this.props;

    evnt.preventDefault();
    await playlistCreateNew(this.state.title, this.state.description, this.state.email, this.state.category);
    this.setState({ suggested: true });
  }

  render() {
    return (
      <Layout>
        <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
          <h1 className='c-form__title'>Create your playlist</h1>

          {this.state.suggested && (
            <h2>Thanks for suggesting a playlist</h2>
          )}

          <form className='c-form' onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              <li>
                <label className='c-form__label'>Playlist title</label>
                <input className='c-input c-input--primary' type="text" name="title"  value={this.state.title} onChange={this.handleChange} required />
              </li>
              <li>
                <label className='c-form__label'>Description</label>
                <textarea className='c-input c-input--primary c-input--textarea' type="text" name="description" value={this.state.description} onChange={this.handleChange}></textarea>
              </li>
              <li>
                <label className='c-form__label'>Category</label>
                <select name="category" value={this.state.category} onChange={this.handleChange}>
                  <option value="0">Uncategorised</option>
                  <option value="2">Autos & Vehicles</option>
                  <option value="1">Film & Animation</option>
                  <option value="10">Music</option>
                  <option value="15">Pets & Animals</option>
                  <option value="17">Sports</option>
                  <option value="18">Short Movies</option>
                  <option value="19">Travel & Events</option>
                  <option value="20">Gaming</option>
                  <option value="21">Videoblogging</option>
                  <option value="22">People & Blogs</option>
                  <option value="23">Comedy</option>
                  <option value="24">Entertainment</option>
                  <option value="25">News & Politics</option>
                  <option value="26">Howto & Style</option>
                  <option value="27">Education</option>
                  <option value="28">Science & Technology</option>
                  <option value="29">Nonprofits & Activism</option>
                  <option value="30">Movies</option>
                  <option value="31">Anime/Animation</option>
                  <option value="32">Action/Adventure</option>
                  <option value="33">Classics</option>
                  <option value="34">Comedy</option>
                  <option value="35">Documentary</option>
                  <option value="36">Drama</option>
                  <option value="37">Family</option>
                  <option value="38">Foreign</option>
                  <option value="39">Horror</option>
                  <option value="40">Sci-Fi/Fantasy</option>
                  <option value="41">Thriller</option>
                  <option value="42">Shorts</option>
                  <option value="43">Shows</option>
                  <option value="44">Trailers</option>
                  <option value="45">Cooking</option>
                </select>
              </li>
              <li>
                <label className='c-form__label'>Email address</label>
                <input className='c-input c-input--primary' type="text" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} required />
              </li>
              <li className='u-text-right'>
                <button class='c-btn c-btn--primary'>Next</button>
              </li>
            </ul>
          </form>

        </div>
      </Layout>
    );
  }
}
export default NewPlaylist;
