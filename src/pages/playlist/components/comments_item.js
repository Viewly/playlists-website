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
      <div className='o-flag o-flag--small u-margin-top'>
        <div className='o-flag__img u-align-top'>
          {user.avatar_url && <img alt='' className='o-avatar o-avatar--large' src={user.avatar_url}/>}
          {!user.avatar_url &&
          <img alt='' className='o-avatar o-avatar--large' src={require("../../../images/avatar-default.jpg")}/>}
        </div>
        <div className='o-flag__body'>
          <span><b>{user?.alias}</b> <time className='c-time'>{timeAgo}</time></span>
          <p className='u-white-space-pre-line'>{description}</p>

          {/*
          <div>
            +{likes_count}
            /
            -{dislikes_count}
          </div>
          {canVote && (
            <div>
              <button onClick={onVote(id, like_status, +1)} className={`c-btn c-btn--small ${youUpvoted ? 'c-btn--primary' : ''}`}>👍</button>
              <button onClick={onVote(id, like_status, -1)} className={`c-btn c-btn--small ${youDownvoted ? 'c-btn--primary' : ''}`}>👎</button>
            </div>
          )}
          {canDelete && (
            <div>
              <button onClick={onDelete(id)}>❌</button>
            </div>
          )}
          */}
        </div>

      </div>
    );
  }
}
