import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

export default class PlaylistCommentItem extends Component {
  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    const { user, description, created_at } = this.props;
    const timeAgo = moment(created_at).startOf("minute").fromNow();

    return (
      <div className='o-flag o-flag--small u-margin-top'>
        <div className='o-flag__img u-align-top'>
          {user.avatar_url && <img alt='' className='o-avatar o-avatar--large' src={user.avatar_url} />}
          {!user.avatar_url && <img alt='' className='o-avatar o-avatar--large' src={require("../../../images/avatar-default.jpg")}/>}
        </div>
        <div className='o-flag__body'>
          <span><b>{user?.alias}</b> <time className='c-time'>{timeAgo}</time></span>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
