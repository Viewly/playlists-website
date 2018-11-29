import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class UserTabs extends Component {
  render() {
    return (
      <nav className='c-nav-account'>
        <ul>
          <li className='c-nav-account__item'>
            <NavLink exact activeClassName='is-current' className='c-nav-account__link has-colored-icon' to="/account">
              <div className='c-nav-account__icon c-colored-icon'>
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-profile.svg")} />
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-profile-hover.svg")} />
              </div>

              <span className='c-nav-account__label'>Profile</span>
            </NavLink>
          </li>
          <li className='c-nav-account__item'>
            <NavLink activeClassName='is-current' className='c-nav-account__link has-colored-icon' to="/account/customization">
              <div className='c-nav-account__icon c-colored-icon'>
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-customization.svg")} />
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-customization-hover.svg")} />
              </div>

              <span className='c-nav-account__label'>Customization</span>
            </NavLink>
          </li>
          <li className='c-nav-account__item'>
            <NavLink activeClassName='is-current' className='c-nav-account__link has-colored-icon' to="/account/password">
            <div className='c-nav-account__icon c-colored-icon'>
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-password.svg")} />
                <img className='c-colored-icon__icon' src={require("../../../images/icons/nav-account/account-password-hover.svg")} />
              </div>

              <span className='c-nav-account__label'>Password</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default UserTabs;
