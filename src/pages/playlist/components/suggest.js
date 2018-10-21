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
        <div>
          <h1 className='u-h4'>Suggest a video for &ldquo;{playlist.title}&rdquo;</h1>

          {this.state.suggested && (
            <div>
              <h2>Your suggestion has been received</h2>
            </div>
          )}

          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Link to video</label>
              <input type="text" name="link" placeholder="Your video link" value={this.state.link} onChange={this.handleChange} required />
            </div>
            <div>
              <label>Description</label>
              <input type="text" name="description" placeholder="Short description" value={this.state.description} onChange={this.handleChange} />
            </div>
            <div>
              <label>Email address</label>
              <input type="text" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} required />
            </div>
            <Link to={`/playlist/${playlist.id}`}>Back to playlist</Link>
            <button className='c-btn c-btn--primary'>Submit</button>
          </form>

        </div>
      </div>
    );
  }
}
