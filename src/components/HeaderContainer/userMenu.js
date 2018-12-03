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
        {/*<img className='o-avatar ' src={user.avatar_url} />*/}
        <img className='o-avatar' src={require("../../images/avatar-default.jpg")} />

      </Fragment>
    );
  }
}
export default UserMenu;
