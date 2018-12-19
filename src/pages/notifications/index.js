import React, { Component } from "react";
import { connect } from "react-redux";

import { notificationsFetch, notificationsMarkRead } from "../../actions/notification";
import NotificationTemplateComment from "./components/comment_template";

@connect((state) => ({
  notifications: state.notifications
}), (dispatch) => ({
  notificationsFetch: () => dispatch(notificationsFetch()),
  notificationsMarkRead: (ids) => dispatch(notificationsMarkRead({ notifications_ids: ids }))
}))
export default class NotificationsPage extends Component {

  componentDidMount() {
    this.reloadNotifications();
  }

  reloadNotifications = () => {
    const { notificationsFetch } = this.props;

    notificationsFetch();
  }

  markAllRead = async () => {
    const { notifications, notificationsMarkRead, reloadNotifications } = this.props;
    const ids = notifications.data.filter(item => item.status === 'unread').map(item => item.id);

    await notificationsMarkRead(ids);
    this.reloadNotifications();
  }

  render() {
    const { notifications } = this.props;
    console.log("notifications", notifications);
    return (
      <div className='o-wrapper o-wrapper--middle u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
          <div className='o-grid__cell'>
            <h1 className='u-h3'>Notifications</h1>
          </div>
          <div className='o-grid__cell'>
            <button className='c-btn c-btn--secondary c-btn--plain' onClick={this.markAllRead}>Mark all as read</button>
          </div>
        </div>
        <ul className='c-notifications'>
          {notifications.data.map(item => (
            <NotificationTemplateComment onClick={this.reloadNotifications} key={`notification-${item.id}`} {...item} />
          ))}
        </ul>
      </div>
    );
  }
}

