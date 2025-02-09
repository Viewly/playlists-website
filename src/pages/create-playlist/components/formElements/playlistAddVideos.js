import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
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
    const { videoPrefil, onAddVideo, onAddPlaylist } = this.props;
    const parsed = queryString.parseUrl(this.state.url);

    if (parsed?.query?.list && parsed?.query?.list !== 'WL' && confirm("URL you pasted contains a playlist. Do you want us to import all videos?")) {
      await onAddPlaylist(this.state.url);
    } else {
      const response = await videoPrefil(this.state.url);
      onAddVideo(response);
    }

    this.setState({ url: "" });
  };

  render() {
    return (
      <li>
        <label className='c-form__label'>Add videos</label>
        <div className='o-flag o-flag--small o-flag--reverse'>
          <div className='o-flag__img'>
            <button type="button" onClick={this.getVideo} className='c-btn c-btn--secondary c-btn--square'>
              <img alt='' className='o-icon o-icon--small' src={require("../../../../images/icons/plus.svg")} />
            </button>
          </div>
          <div className='o-flag__body'>
            <input
              className='c-input c-input--primary'
              type="text"
              name="url"
              value={this.state.url}
              onKeyPress={(e) => e.key === 'Enter' && this.getVideo()}
              onChange={(e) => this.setState({ url: e.target.value })}/>
          </div>
        </div>
        <small className='c-form__annotation'>Copy video URL and paste it here</small>
      </li>

    );
  }
}
