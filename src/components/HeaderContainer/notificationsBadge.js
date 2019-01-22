import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { notificationsFetch } from "../../actions/notification";
import DropdownMenu from "../DropdownMenu";
import NotificationTemplateComment from "../../pages/notifications/components/comment_template";

const SMALL_SCREEN_WIDTH = 500;
const NOTIFICATIONS_REFRESH_INTERVAL = 10000;

@withRouter
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
    }, NOTIFICATIONS_REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.reloadInterval);
  }

  clickPhone = () => {
    const { history } = this.props;

    if (document?.body?.clientWidth < SMALL_SCREEN_WIDTH) {
      history.push("/notifications");
      return false;
    }

    return true;
  }

  render() {
    const { notifications } = this.props;
    const unreadNotifications = notifications.data.filter(item => item.status === 'unread');

    return (
      <div>
        <DropdownMenu
          wide
          showArrow={false}
          onToggleClick={this.clickPhone}
          toggle={(
            <div className={`c-header__icon-notification c-notification-badge ${unreadNotifications.length > 0 ? 'is-unread' : ''}`}>
              <img alt='' className='c-notification-badge__icon' src={require("../../images/icons/bell.svg")} />
              <img alt='' className='c-notification-badge__icon' src={require("../../images/icons/bell-active.svg")} />
            </div>
          )}
          list={unreadNotifications.slice(0, 5).map(item => (
            <NotificationTemplateComment key={`notification-${item.id}`} {...item} />
          ))}
          emptyList={(
            <div className='c-thank-you c-thank-you--small'>
              <img alt='' className='c-thank-you__img' src={require("../../images/graphic-success.svg")} />
              <p>You have no unread notifications.</p>
            </div>
          )}
          dropdownFooter={(
            <div>
              <Link to="/notifications">View read notifications</Link>
            </div>
          )}
        />
      </div>
    );
  }
}
