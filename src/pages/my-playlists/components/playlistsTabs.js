import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PlaylistsTabs extends Component {
  render() {
    const { playlists } = this.props;
    const numPublished = playlists.data.filter(item => item.status === 'published').length;
    const numDrafts = playlists.data.filter(item => item.status !== 'published').length;
    
    return (
      <nav className='c-nav-tabs u-margin-bottom-large'>
        <ul>
          <li className='c-nav-tabs__item'>
            <NavLink exact activeClassName='is-current' className='c-nav-tabs__link' to='/my-playlists'>
              {numPublished} Published
            </NavLink>
          </li>
          <li className='c-nav-tabs__item'>
            <NavLink activeClassName='is-current' className='c-nav-tabs__link' to='/my-playlists/drafts'>
              {numDrafts} Drafts
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default PlaylistsTabs;
