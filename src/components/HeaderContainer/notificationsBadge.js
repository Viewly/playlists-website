import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { notificationsFetch } from "../../actions/notification";
import UserMenu from "./userMenu";
import DropdownMenu from "../DropdownMenu";
import NotificationTemplateComment from "../../pages/notifications/components/comment_template";

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
    const unreadNotifications = notifications.data.filter(item => item.status === 'unread');

    return (
      <div>
        <DropdownMenu
          wide
          showArrow={false}
          toggle={(
            <div className={`c-notification-badge ${unreadNotifications.length > 0 ? 'is-unread' : ''}`}>
              <img alt='' className='c-notification-badge__icon' src={require("../../images/icons/bell.svg")} />
              <img alt='' className='c-notification-badge__icon' src={require("../../images/icons/bell-active.svg")} />
            </div>
          )}
          list={unreadNotifications.slice(0, 5).map(item => (
            <NotificationTemplateComment key={`notification-${item.id}`} {...item} />
          ))}
          emptyList={(
            <div>No unread notifications 😀</div>
          )}
          dropdownFooter={(
            <div>
              <Link to="/notifications">See all</Link>
            </div>
          )}
        />
      </div>
    );
  }
}
