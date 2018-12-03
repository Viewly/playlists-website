import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistSuggestVideo } from "../../../actions";
import Loading from "../../../components/loading";
import { LOADED } from "../../../constants/status_types";

@connect((state) => ({
  playlist: state.playlist
}), (dispatch) => ({
  playlistSuggestVideo: (playlistId, description, url, email) => dispatch(playlistSuggestVideo({ playlistId, description, url, email })),
}))
export default class PlaylistInfo extends Component {
  static propTypes = {
    playlistSuggestVideo: PropTypes.func.isRequired,
    playlist: PropTypes.object,
  }

  state = {
    link: "",
    description: "",
    email: "",
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
    const isLoaded = playlist._status === LOADED;

    if (!isLoaded) return <Loading />;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {this.state.suggested && (
          <div className='c-thank-you'>
            <img className='c-thank-you__img' src={require("../../../images/message-thank-you.svg")} />
            <h5 className='u-margin-bottom-small'>Thanks for suggesting a video</h5>
            <p>We&#x27;ve notified the author about your suggestion. You will get an email when the video is added to the playlist.</p>
            <Link className='c-btn c-btn--primary c-btn--plain' to={`/playlist/${playlist.id}`}>&larr; Go back to the playlist</Link>
          </div>
        )}

        {!this.state.suggested && (
          <div>
            <h1 className='u-h4 u-margin-bottom-large'>Suggest a video for &ldquo;{playlist.title}&rdquo;</h1>

            <form className='c-form' onSubmit={this.handleSubmit}>
              <ul className='c-form__list c-form__list--large'>
                <li>
                  <label className='c-form__label'>Link to the video</label>
                  <input className='c-input c-input--primary' type="url" name="link" value={this.state.link} onChange={this.handleChange} required />
                </li>
                <li>
                  <label className='c-form__label'>Why should it be added to the playlist? (optional)</label>
                  <textarea className='c-input c-input--primary c-input--textarea' name="description" value={this.state.description} onChange={this.handleChange}></textarea>
                  <small className='c-form__annotation'>Briefly explain why you&#x27;re suggesting this video.</small>
                </li>
                <li>
                  <label className='c-form__label'>Your email address</label>
                  <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                  <small className='c-form__annotation'>We&#x27;ll use this to notify you when the video is added to the playlist.</small>
                </li>
                <li>
                  <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
                    <div className='o-grid__cell'>
                      <Link className='c-btn c-btn--secondary c-btn--plain' to={`/playlist/${playlist.url}`}>&larr; Back to playlist</Link>
                    </div>
                    <div className='o-grid__cell'>
                      <button className='c-btn c-btn--secondary'>Submit</button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        )}
      </div>
    );
  }
}
