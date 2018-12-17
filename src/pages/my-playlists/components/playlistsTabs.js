import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PlaylistsTabs extends Component {
  render() {
    return (
      <nav className='c-nav-tabs'>
        <ul>
          <li className='c-nav-tabs__item'>
            <NavLink exact activeClassName='is-current' className='c-nav-tabs__link' to='/my-playlists'>Published</NavLink>
          </li>
          <li className='c-nav-tabs__item'>
            <NavLink activeClassName='is-current' className='c-nav-tabs__link' to='/my-playlists/drafts'>Drafts</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default PlaylistsTabs;
