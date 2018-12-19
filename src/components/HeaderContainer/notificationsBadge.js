import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { notificationsFetch } from "../../actions/notification";

@connect((state) => ({
  notifications: state.notifications
}), (dispatch) => ({
  notificationsFetch: () => dispatch(notificationsFetch())
}))
export default class NotificationsBadge extends Component {
  static propTypes = {
    notifications: PropTypes.object,
    notificationsFetch: PropTypes.func
  }

  componentDidMount() {
    const { notificationsFetch } = this.props;

    notificationsFetch();

    this.reloadInterval = setInterval(() => {
      notificationsFetch();
    }, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.reloadInterval);
  }

  render() {
    const { notifications } = this.props;

    return (
      <div>
        <Link to='/notifications' className={`c-notification-badge ${notifications.data.filter(item => item.status === 'unread').length > 0 ? 'is-unread' : ''}`}>
          <img className='c-notification-badge__icon' src={require("../../images/icons/bell.svg")} />
          <img className='c-notification-badge__icon' src={require("../../images/icons/bell-active.svg")} />
        </Link>
      </div>
    );
  }
}
