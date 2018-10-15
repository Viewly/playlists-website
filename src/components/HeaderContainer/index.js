import React, { Component } from "react";
import { Link } from "react-router-dom";

class HeaderContainer extends Component {
  render() {
    return (
      <header className='c-header'>
        <div className='o-wrapper c-header__wrapper'>
          <div className='c-header-wrapper__left'>
            <Link to='/' className='c-logo'>[LOGO HERE]</Link>
            <input placeholder="Search playlists" name="" autocomplete="off" value="" />
          </div>

          <div className='c-header-wrapper__right'>
            <a href='#' className='c-btn c-btn--primary c-btn--plain'>Create your playlist</a>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
