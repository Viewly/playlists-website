import React, { Component, Fragment } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  GooglePlusIcon,
  GooglePlusShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

export default class SharePlaylist extends Component {
  state = {
    active: false,
  }

  toggleShare = () => {
    this.setState({ active: !this.state.active });
  }

  render() {
    const { playlist } = this.props;
    const shareTitle = playlist.title;
    // TODO move these somewhere else
    const shareUrl = `https://www.vidflow.io/playlist/${playlist.id}`;
    const twitterTitle = "Found this playlist on @vidflow_io";
    const emailSubject = "Playlist from vidflow.io";

    return (
      <div className={`shame-share ${this.state.active ? 'is-active' : ''}`}>
        <button className='c-btn c-btn--secondary' onClick={this.toggleShare}>Share</button>

        <div className='shame-share-socials'>
          <FacebookShareButton url={shareUrl} quote={shareTitle} className='shame-share-item'>
            <FacebookIcon
              size={44}
              round />
            {/* <span>Facebook</span> */}
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={twitterTitle} className='shame-share-item'>
            <TwitterIcon
              size={44}
              round />
            {/* <span>Twitter</span> */}
          </TwitterShareButton>

          <RedditShareButton url={shareUrl} title={shareTitle} className='shame-share-item'>
            <RedditIcon
              size={44}
              round />
            {/* <span>Reddit</span> */}
          </RedditShareButton>

          <GooglePlusShareButton url={shareUrl} className='shame-share-item'>
            <GooglePlusIcon
              size={44}
              round />
            {/* <span>Google+</span> */}
          </GooglePlusShareButton>

          <EmailShareButton url={shareUrl} subject={emailSubject} body={shareTitle} className='shame-share-item'>
            <EmailIcon
              size={44}
              round />
            {/* <span>Email</span> */}
          </EmailShareButton>
        </div>

      </div>
    );
  }
}
