import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default class PlaylistCommentItem extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { id, user, description, created_at, canDelete, canVote, onVote, onDelete, likes_count, dislikes_count, like_status } = this.props;
    const timeAgo = moment(created_at).startOf("minute").fromNow();

    const youUpvoted = like_status === 1;
    const youDownvoted = like_status === -1;

    return (
      <div className='o-flag o-flag--small u-margin-top-large'>
        <div className='o-flag__img u-align-top'>
          {user.avatar_url && <img alt='' className='o-avatar o-avatar--large' src={user.avatar_url}/>}
          {!user.avatar_url &&
          <img alt='' className='o-avatar o-avatar--large' src={require("../../../images/avatar-default.jpg")}/>}
        </div>
        <div className='o-flag__body'>
          <span><b>{user?.alias}</b> <time className='c-time'>{timeAgo}</time></span>
          <p className='u-white-space-pre-line u-margin-top-tiny'>{description}</p>
          {canVote && (
            <div className='o-grid o-grid--auto o-grid--middle u-margin-top-tiny'>
              <div className='o-grid__cell'>
                <div className='o-flag o-flag--tiny'>
                  <div className='o-flag__img'>
                    <button title='like' onClick={onVote(id, like_status, +1)} className={`c-btn c-btn--vote u-align-top ${youUpvoted ? 'is-active' : ''}`}>
                  <svg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8.29 5.2V2.8c0-.994-.823-1.8-1.838-1.8L4 6.4V13h6.914a1.218 1.218 0 0 0 1.226-1.02l.846-5.4a1.183 1.183 0 0 0-.287-.968 1.238 1.238 0 0 0-.939-.412H8.29zM4 13H2.2c-.663 0-1.2-.57-1.2-1.273V7.273C1 6.57 1.537 6 2.2 6H4v7z' stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'/>
                  </svg>
                    </button>
                  </div>
                  <div className='o-flag__body'>
                    {likes_count}
                  </div>
                </div>
              </div>
              <div className='o-grid__cell'>
                <div className='o-flag o-flag--tiny'>
                  <div className='o-flag__img'>
                    <button title='dislike' onClick={onVote(id, like_status, -1)} className={`c-btn c-btn--vote ${youDownvoted ? 'is-active' : ''}`}>
                  <svg width='14' height='14' viewBox='0 0 14 14' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8.29 8.8v2.4c0 .994-.823 1.8-1.838 1.8L4 7.6V1h6.914a1.218 1.218 0 0 1 1.226 1.02l.846 5.4c.054.348-.05.702-.287.968-.236.265-.58.416-.939.412H8.29zM4 1H2.2C1.537 1 1 1.57 1 2.273v4.454C1 7.43 1.537 8 2.2 8H4V1z' stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'/>
                  </svg>
                    </button>
                  </div>
                  <div className='o-flag__body'>
                    {dislikes_count}
                  </div>
                </div>
              </div>
              {canDelete && (
                <div className='o-grid__cell'>
                  <button className='c-btn c-btn--plain c-btn--small' onClick={onDelete(id)}>Delete</button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    );
  }
}
