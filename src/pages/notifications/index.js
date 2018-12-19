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
    const { notificationsFetch } = this.props;

    notificationsFetch();
  }

  render() {
    const { notifications } = this.props;
    console.log("notifications", notifications);
    return (
      <div className='o-wrapper o-wrapper--middle u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>Notifications</h1>
        <ul className='c-notifications'>
          {notifications.data.map(item => (
            <NotificationTemplateComment key={`notification-${item.id}`} {...item} />
          ))}
        </ul>
      </div>
    );
  }
}

