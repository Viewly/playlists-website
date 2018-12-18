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
      <div
        onClick={this.onClick}
        style={{ cursor: 'pointer', padding: '5px', margin: '5px', border: '1px solid black', backgroundColor: isUnread ? 'gray' : 'white' /* REMOVE ENTIRE LINE */ }}
        className={`item ${isUnread ? 'is-unread' : ''}`}>
        <p
          style={{ fontWeight: isUnread ? 'bold' : 'regular' /* REMOVE ENTIRE LINE */ }}
        >{title}</p>
      </div>
    );
  }
}

