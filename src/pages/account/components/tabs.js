import React, { Component } from "react";
// import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class UserTabs extends Component {
  render() {
    return (
      <ul>
        <li><NavLink activeClassName='is-current' to="/account">Profile</NavLink></li>
        <li><NavLink activeClassName='is-current' to="/account/customization">Customization</NavLink></li>
        <li><NavLink activeClassName='is-current' to="/account/password">Password</NavLink></li>
      </ul>
    );
  }
}
export default UserTabs;
