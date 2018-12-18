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
  }

  render() {
    const { notifications } = this.props;

    return (        // PLEASE DELETE THIS INLINE STYLE <3
      <div style={{ border: "1px solid pink", textAlign: "center", borderRadius: '50%', height: '30px', width: '30px', lineHeight: '30px' }}>
        <Link to='/notifications'>{notifications.data.filter(item => item.status === 'unread').length}</Link>
      </div>
    );
  }
}
