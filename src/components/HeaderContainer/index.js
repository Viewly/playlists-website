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
import NotificationsBadge from "./notificationsBadge";

@withRouter
@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  doLogout: () => dispatch({ type: LOGOUT })
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
                  <NavLink to='/' exact activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                    <div className='c-nav-primary__icon c-colored-icon'>
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-home.svg")} />
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-home-active.svg")} />
                    </div>

                    <span className='c-nav-primary__label'>Home</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/new' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                    <div className='c-nav-primary__icon c-colored-icon'>
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-new.svg")} />
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-new-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>New</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/categories' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                    <div className='c-nav-primary__icon c-colored-icon'>
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-category.svg")} />
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-category-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>Categories</span>
                  </NavLink>
                </li>
                <li className='c-nav-primary__item'>
                  <NavLink to='/hashtags' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                    <div className='c-nav-primary__icon c-colored-icon'>
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-hashtag.svg")} />
                      <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-hashtag-active.svg")} />
                    </div>
                    <span className='c-nav-primary__label'>Explore</span>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className='c-header__grid__item c-header__grid__item--right'>
            <div className='o-grid o-grid--auto o-grid--middle'>
              <div className='o-grid__cell c-header__hide-on-extrasmallscreen'>
                <SearchInput />
              </div>
              {user && (
                <div className='o-grid__cell'>
                  <Link to='/create-playlist' className='c-header__btn-cta c-btn c-btn--primary c-btn--plain c-btn--with-icon has-colored-icon'>
                    <img className='c-header__btn-cta__icon o-icon o-icon--small' src={require("../../images/icons/create-playlist-hover.svg")} />
                    <span className='c-header__btn-cta__label'>Create playlist</span>
                  </Link>
                </div>
              )}
              {user && (
                <div className='o-grid__cell'>
                  <NotificationsBadge />
                </div>
              )}
              {user && (
                <div className='o-grid__cell'>
                  <DropdownMenu
                    toggle={<UserMenu user={user} />}
                    list={[
                      { label: "My playlists", url: "/my-playlists" },
                      { label: "Bookmarks", url: "/bookmarks" },
                      { label: "Profile settings", url: "/account" },
                      { label: "Take the survey", url: "https://viewly.typeform.com/to/fRTC0m", highlight: true},
                      { label: "Logout", onClick: this.logOut },
                    ]}
                  />
                </div>
              )}
              {!user && (
                <div className='o-grid__cell'>
                  <div className='o-grid o-grid--middle o-grid--auto'>
                    <div className='o-grid__cell'>
                      <Link to='/login' className='c-btn c-btn--secondary c-btn--plain'>Login</Link>
                    </div>
                    <div className='o-grid__cell'>
                      <Link to='/register' className='c-btn c-btn--secondary c-header__btn-register'>Register</Link>
                    </div>
                  </div>
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
