import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class UserMenu extends Component {
  static propTypes = {
    user: PropTypes.object,
  }

  render() {
    const { user } = this.props;

    return (
      <Fragment>
        {user.avatar_url && <img className='c-header__avatar o-avatar o-avatar--large' src={user.avatar_url} />}
        {!user.avatar_url && <img className='c-header__avatar o-avatar o-avatar--large' src={require("../../images/avatar-default.jpg")} />}
      </Fragment>
    );
  }
}
export default UserMenu;
