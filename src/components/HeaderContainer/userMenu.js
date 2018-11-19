import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

class UserMenu extends Component {

  render() {
    const { avatar } = this.props;
    return (
      <Fragment>
        <img className='o-avatar ' src="http://i.pics.rs/LJXhy.png" />
      </Fragment>
    );
  }
}
export default UserMenu;
