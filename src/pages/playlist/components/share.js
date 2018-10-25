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
    const shareUrl = `https://www.vidflow.io/playlist/${playlist.url}`;
    const twitterTitle = "Found this playlist on @vidflow_io";
    const emailSubject = "Playlist from vidflow.io";

    return (
      <div className={`c-share ${this.state.active ? 'is-active' : ''}`}>
        <button className='c-btn c-share__btn' onClick={this.toggleShare}>
          <svg className='o-icon' width="21" height="22" viewBox="0 0 21 22" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1 1)" stroke="currentColor" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="16" cy="3" r="3"/>
              <circle cx="3" cy="11" r="3"/>
              <circle cx="16" cy="17" r="3"/>
              <path d="M6 12l6.83 3.98M12.82 5L6 8.98"/>
            </g>
          </svg>
        </button>

        <div className='c-share__socials'>
          <FacebookShareButton url={shareUrl} quote={shareTitle} className='c-share__item'>
            <FacebookIcon
              size={36}
              round />
            {/* <span>Facebook</span> */}
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={twitterTitle} className='c-share__item'>
            <TwitterIcon
              size={36}
              round />
            {/* <span>Twitter</span> */}
          </TwitterShareButton>

          <RedditShareButton url={shareUrl} title={shareTitle} className='c-share__item'>
            <RedditIcon
              size={36}
              round />
            {/* <span>Reddit</span> */}
          </RedditShareButton>

          <GooglePlusShareButton url={shareUrl} className='c-share__item'>
            <GooglePlusIcon
              size={36}
              round />
            {/* <span>Google+</span> */}
          </GooglePlusShareButton>

          <EmailShareButton url={shareUrl} subject={emailSubject} body={shareTitle} className='c-share__item'>
            <EmailIcon
              size={36}
              round />
            {/* <span>Email</span> */}
          </EmailShareButton>
        </div>

      </div>
    );
  }
}
