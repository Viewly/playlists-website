import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./searchInput";

class HeaderContainer extends Component {
  state = {
    searchText: ''
  }

  render() {
    return (
      <header className='c-header'>
        <div className='o-wrapper c-header__wrapper'>
          <div className='c-header-wrapper__left'>
            <Link to='/' className='c-logo'>
              <img className='c-logo__img' src={require('../../images/logo.svg')} />
            </Link>

            <SearchInput />
          </div>

          <div className='c-header-wrapper__right'>
            <Link to='/new' className='c-btn c-btn--primary c-btn--plain'>Create your playlist</Link>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
