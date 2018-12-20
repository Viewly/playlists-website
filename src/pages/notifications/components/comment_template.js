import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { notificationsMarkRead } from "../../../actions/notification";
import moment from "moment";

@withRouter
@connect(null, (dispatch) => ({
  notificationsMarkRead: (id) => dispatch(notificationsMarkRead({ notifications_ids: [id] }))
}))
export default class NotificationTemplateComment extends Component {
  onClick = async () => {
    const { id, metadata, history, notificationsMarkRead, onClick } = this.props;

    await notificationsMarkRead(id)
    onClick();
    history.push(`/playlist/${metadata.playlist_url}/comments`);
  };

  render() {
    const { title, status, created_at, metadata } = this.props;
    const isUnread = status === 'unread';
    const timeAgo = moment(created_at).startOf("minute").fromNow();

    return (
      <li className='c-notifications__item'>
        <div
          onClick={this.onClick}
          className={`c-notifications__link ${isUnread ? 'is-unread' : ''}`}>
          <div className='o-flag o-flag--small'>
            <div className='o-flag__img u-align-top'>
              {metadata.comment_owner_avatar_url && <img className='o-avatar o-avatar--large' src={metadata.comment_owner_avatar_url} />}
              {!metadata.comment_owner_avatar_url && <img className='o-avatar o-avatar--large' src={require("../../../images/avatar-default.jpg")} />}
            </div>
            <div className='o-flag__body'>
              <p>{title}</p>
              <time className='c-notifications__time'>{timeAgo}</time>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

