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
            <div className='o-grid o-grid--auto o-grid--middle'>
              <div className='o-grid__cell'>
                <nav className='c-nav-primary'>
                  <ul>
                    <li className='c-nav-primary__item'>
                      <NavLink to='/feed' exact activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                        <div className='c-nav-primary__icon c-colored-icon'>
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-home.svg")} />
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-home-active.svg")} />
                        </div>

                        <span className='c-nav-primary__label'>For you</span>
                      </NavLink>
                    </li>
                    <li className='c-nav-primary__item'>
                      <NavLink to='/explore' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                        <div className='c-nav-primary__icon c-colored-icon'>
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-new.svg")} />
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-new-active.svg")} />
                        </div>
                        <span className='c-nav-primary__label'>Explore</span>
                      </NavLink>
                    </li>
                    {user && (
                      <li className='c-nav-primary__item'>
                        <NavLink to='/bookmarks' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                          <div className='c-nav-primary__icon c-colored-icon'>
                            <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-bookmark.svg")} />
                            <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-bookmark-hover.svg")} />
                          </div>
                          <span className='c-nav-primary__label'>Bookmarks</span>
                        </NavLink>
                      </li>
                    )}
                    <li className='c-nav-primary__item c-nav-primary__item--search'>
                      <NavLink to='/search' activeClassName='is-current' className='c-nav-primary__link has-colored-icon'>
                        <div className='c-nav-primary__icon c-colored-icon'>
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-search.svg")} />
                          <img className='c-colored-icon__icon' src={require("../../images/icons/nav-primary/nav-search-active.svg")} />
                        </div>
                        <span className='c-nav-primary__label'>Search</span>
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className='o-grid__cell c-header__hide-on-extrasmallscreen'>
                <SearchInput />
              </div>
            </div>
          </div>

          <div className='c-header__grid__item c-header__grid__item--right'>
            <div className='o-grid o-grid--auto o-grid--middle'>
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
                      { label: "My profile", url: "/my-profile" },
                      { label: "Settings", url: "/account" },
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
