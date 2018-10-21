import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistSuggestVideo } from "../../../actions";

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistSuggestVideo: (playlistId, description, url, email) => dispatch(playlistSuggestVideo({ playlistId, description, url, email })),
}))
export default class PlaylistInfo extends Component {
  state = {
    link: '',
    description: '',
    email: '',
    suggested: false
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { playlistSuggestVideo, playlist } = this.props;

    evnt.preventDefault();
    await playlistSuggestVideo(playlist.id, this.state.description, this.state.link, this.state.email);
    this.setState({ suggested: true });
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';

    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-huge u-padding-bottom'>
        <div className='c-form'>
          <h1 className='c-form__title'>Suggest a video for &ldquo;{playlist.title}&rdquo;</h1>

          {this.state.suggested && (
            <div>
              <h2>Your suggestion has been received</h2>
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              <li>
                <label className='c-form__label'>Link to the video</label>
                <input className='c-input c-input--primary' type="text" name="link" placeholder="Your video link" value={this.state.link} onChange={this.handleChange} required />
              </li>
              <li>
                <label className='c-form__label'>Why should this video be added to the playlist?</label>
                <textarea className='c-input c-input--primary c-input--textarea' name="description" placeholder="Short description" value={this.state.description} onChange={this.handleChange}></textarea>
              </li>
              <li>
                <label className='c-form__label'>Your email address</label>
                <input className='c-input c-input--primary' type="text" name="email" placeholder="you@rock.com" value={this.state.email} onChange={this.handleChange} required />
              </li>
              <li>
                <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
                  <div className='o-grid__cell'>
                    <Link to={`/playlist/${playlist.id}`}>&larr; Back to playlist</Link>
                  </div>
                  <div className='o-grid__cell'>
                    <button className='c-btn c-btn--primary'>Submit</button>
                  </div>
                </div>
              </li>
            </ul>
          </form>

        </div>
      </div>
    );
  }
}
