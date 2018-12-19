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
        <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
          <div className='o-grid__cell'>
            <h1 className='u-h3'>Notifications</h1>
          </div>
          <div className='o-grid__cell'>
            {notifications.data.length !== 0 && (
              <button className='c-btn c-btn--secondary c-btn--plain' to=''>Mark all as read</button>
            )}
          </div>
        </div>
        <ul className='c-notifications'>
          {notifications.data.map(item => (
            <NotificationTemplateComment key={`notification-${item.id}`} {...item} />
          ))}
          {notifications.data.length === 0 && (
           <li>
            <div className='c-thank-you'>
              <img className='c-thank-you__img' src={require("../../images/graphic-error.svg")} />
              <p>You have no notifications yet</p>
            </div>
           </li>
          )}
        </ul>
      </div>
    );
  }
}

