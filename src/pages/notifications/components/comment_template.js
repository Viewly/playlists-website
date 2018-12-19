import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { notificationsMarkRead } from "../../../actions/notification";

@withRouter
@connect(null, (dispatch) => ({
  notificationsMarkRead: (id) => dispatch(notificationsMarkRead({ notifications_ids: [id] }))
}))
export default class NotificationTemplateComment extends Component {
  onClick = async () => {
    const { id, metadata, history, notificationsMarkRead } = this.props;

    await notificationsMarkRead(id)
    history.push(`/playlist/${metadata.playlist_url}/comments`);
  };

  render() {
    const { title, status } = this.props;
    const isUnread = status === 'unread';
    console.log("Notification props", this.props);

    return (
      <li className='c-notifications__item'>
        <div
          onClick={this.onClick}
          className={`c-notifications__link ${isUnread ? 'is-unread' : ''}`}>
          <div className='o-flag o-flag--small'>
            <div className='o-flag__img u-align-top'>
              <img className='o-avatar o-avatar--large' src={require("../../../images/avatar-default.jpg")} />
            </div>
            <div className='o-flag__body'>
              <p>{title}</p>
              <time className='c-notifications__time'>5h ago</time>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

