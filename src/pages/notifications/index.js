import React, { Component } from "react";
import { connect } from "react-redux";

import { notificationsFetch } from "../../actions/notification";
import NotificationTemplateComment from "./components/comment_template";

@connect((state) => ({
  notifications: state.notifications
}), (dispatch) => ({
  notificationsFetch: () => dispatch(notificationsFetch())
}))
export default class NotificationsPage extends Component {

  componentDidMount() {
    this.reloadNotifications();
  }

  reloadNotifications = () => {
    const { notificationsFetch } = this.props;

    notificationsFetch();
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
            <button className='c-btn c-btn--secondary c-btn--plain' to=''>Mark all as read</button>
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

