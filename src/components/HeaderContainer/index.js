import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import SearchInput from "./searchInput";
import { LOGOUT } from "../../actions/user";
import DropdownMenu from "../DropdownMenu";
import UserMenu from "./userMenu";
import BookmarksBadge from "./bookmarksBadge";
import { OPEN_LOGIN_MODAL } from "../../actions/user";

@withRouter
@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  doLogout: () => dispatch({ type: LOGOUT }),
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "login" } }),
}))
class HeaderContainer extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    doLogout: PropTypes.func,
    history: PropTypes.object
  }

  state = {
    searchText: ""
  }

  logOut = () => {
    const { doLogout, history } = this.props;

    doLogout();
    history.push("/");
  }

  render() {
    const { user } = this.props;

    return (
      <header className='c-header'>
        <div className='o-wrapper c-header__grid'>
          <div className='c-header__grid__item'>
            <Link to='/' className='c-logo'>
              <img className='c-logo__img' src={require("../../images/logo.svg")} />
            </Link>
          </div>

          <div className='c-header__grid__item'>
            <nav className='c-nav-primary'>
              <ul>
                <li className='c-nav-primary__item'>
                  <NavLink to='/' exact activeClassName='is-current' className='c-nav-primary__link'>
                    <div className='c-nav-primary__icon'>
                      <img src={require("../../images/nav-icons/nav-home.svg")} />
                      <img src={require("../../images/nav-icons/nav-home-active.svg")} />
                    </div>

                    <span className='c-nav-primary__label'>Home</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/new' activeClassName='is-current' className='c-nav-primary__link'>
                    <div className='c-nav-primary__icon'>
                      <img src={require("../../images/nav-icons/nav-new.svg")} />
                      <img src={require("../../images/nav-icons/nav-new-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>New</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/categories' activeClassName='is-current' className='c-nav-primary__link'>
                    <div className='c-nav-primary__icon'>
                      <img src={require("../../images/nav-icons/nav-category.svg")} />
                      <img src={require("../../images/nav-icons/nav-category-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>Categories</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/hashtags' activeClassName='is-current' className='c-nav-primary__link'>
                    <div className='c-nav-primary__icon'>
                      <img src={require("../../images/nav-icons/nav-hashtag.svg")} />
                      <img src={require("../../images/nav-icons/nav-hashtag-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>Explore</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <div className='c-nav-primary__link'>
                    <button onClick={() => this.props.openLoginModal()}>MODAL</button>
                  </div>
                </li>
              </ul>
            </nav>
          </div>

          <div className='c-header__grid__item c-header__grid__item--right'>
            <div className='o-grid o-grid--auto o-grid--middle o-grid--large'>
              <div className='o-grid__cell'>
                <SearchInput />
              </div>
              <div className='o-grid__cell'>
                <Link to='/create-playlist' className='c-btn c-btn--primary c-btn--plain'>Create playlist</Link>
              </div>
              {user && (
                <div className='o-grid__cell'>
                  <BookmarksBadge />
                </div>
              )}
              {user && (
                <div className='o-grid__cell'>
                  <DropdownMenu
                    toggle={<UserMenu user={user} />}
                    list={[
                      { label: "Bookmarks", url: "/bookmarks" },
                      { label: "Profile settings", url: "/account" },
                      { label: "Logout", onClick: this.logOut },
                    ]}
                  />
                </div>
              )}
              {!user && false && (
                <div className='o-grid__cell'>
                  <Link to='/login' className='c-btn c-btn--primary c-btn--plain'>Login</Link>
                  &nbsp;
                  <Link to='/register' className='c-btn c-btn--primary c-btn--plain'>Register</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
