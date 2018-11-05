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
        <div className='o-wrapper c-header__grid'>
          <div className='c-header__grid__item'>
            <Link to='/' className='c-logo'>
              <img className='c-logo__img' src={require('../../images/logo.svg')} />
            </Link>
          </div>

          <div className='c-header__grid__item'>
            <nav className='c-nav-primary'>
              <ul>
                <li className='c-nav-primary__item is-current'>
                  <Link to='/' className='c-nav-primary__link'>
                    <svg className='o-icon' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M8.667 23v-9.9h6.666V23H20a2 2 0 0 0 2-2V8.7L12 1 2 8.7V21a2 2 0 0 0 2 2h4.667z' stroke='currentColor' strokeWidth='2' fill='none' strokeLinecap='round' strokeLinejoin='round'/>
                    </svg>
                    <span className='c-nav-primary__label'>Home</span>
                  </Link>
                </li>
                <li className='c-nav-primary__item'>
                  <Link to='/new' className='c-nav-primary__link'>
                    <svg className='o-icon' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                      <g transform='translate(1 1)' stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                        <circle cx='11' cy='11' r='11'/>
                        <path d='M22 11h-5M5 11H0m11-6V0m0 22v-5'/>
                      </g>
                    </svg>
                    <span className='c-nav-primary__label'>New</span>
                  </Link>
                </li>
                <li className='c-nav-primary__item'>
                  <Link to='/categories' className='c-nav-primary__link'>
                    <svg className='o-icon' width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                      <g stroke='currentColor' strokeWidth='2' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'>
                        <path d='M1 1h7v7H1zM12 1h7v7h-7zM12 12h7v7h-7zM1 12h7v7H1z'/>
                      </g>
                    </svg>
                    <span className='c-nav-primary__label'>Categories</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className='c-header__grid__item c-header__grid__item--right'>
            <SearchInput />
          </div>

          <div className='c-header__grid__item c-header__grid__item--right'>
            <Link to='/create-playlist' className='c-btn c-btn--primary c-btn--plain'>Create playlist</Link>
          </div>
        </div>
      </header>
    );
  }
}
export default HeaderContainer;
