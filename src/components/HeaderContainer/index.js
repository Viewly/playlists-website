import React, { Component } from "react";
import { Link } from "react-router-dom";

class HeaderContainer extends Component {
  render() {
    return (
      <div className='header'>
        <div className='header__left'>
          <Link to='/'>&lt;</Link>
          <div>
            Search playlist
          </div>
        </div>

        <div className='header__right'>
          <a href='#'>Log in</a>
          <a href='#'>Create account</a>
        </div>
      </div>
    );
  }
}
export default HeaderContainer;
