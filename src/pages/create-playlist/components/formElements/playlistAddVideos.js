import React, { Component } from "react";
import { connect } from "react-redux";

import { playlistAddVideo, videoPrefil } from "../../../../actions/playlist";

@connect(null, (dispatch) => ({
  videoPrefil: (url) => dispatch(videoPrefil({ url })),
  playlistAddVideo: (data) => dispatch(playlistAddVideo(data))
}))
export default class PlaylistAddVideos extends Component {
  state = {
    url: ""
  };

  getVideo = async () => {
    const { videoPrefil, onAddVideo } = this.props;

    const response = await videoPrefil(this.state.url);

    // console.log("RESP", response);
    // this.addVideo(response);

    onAddVideo(response);
  };

  addVideo = (video) => {
    const { playlistAddVideo, playlistId } = this.props;

    playlistAddVideo({ ...video, playlist_id: playlistId });
  };

  render() {
    return (
      <li>
        <label className='c-form__label'>Add videos</label>
        <div className='o-flag o-flag--reverse'>
          <div className='o-flag__img'>
            <button type="button" onClick={this.getVideo} className='c-btn c-btn--secondary c-btn--square'>
              <img className='o-icon o-icon--small' src={require("../../../../images/icons/plus.svg")}/>
            </button>
          </div>
          <div className='o-flag__body'>
            <input
              className='c-input c-input--primary'
              type="text"
              name="url"
              value={this.state.url}
              onChange={(e) => this.setState({ url: e.target.value })}/>
          </div>
        </div>
        <small className='c-form__annotation'>Copy video URL and paste it here</small>
      </li>

    );
  }
}
