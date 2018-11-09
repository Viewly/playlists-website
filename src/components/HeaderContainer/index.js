import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SearchInput from "./searchInput";

class HeaderContainer extends Component {
  state = {
    searchText: ""
  }

  render() {
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
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
