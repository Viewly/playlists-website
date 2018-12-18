import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class PlaylistTabs extends Component {
  render() {
    const { url, videos } = this.props;

    return (
      <nav className='c-nav-tabs c-nav-tabs--secondary'>
        <ul>
          <li className='c-nav-tabs__item'>
            <NavLink exact activeClassName='is-current' className='c-nav-tabs__link' to={`/playlist/${url}`}>Videos {videos}</NavLink>
          </li>
          <li className='c-nav-tabs__item'>
            <NavLink activeClassName='is-current' className='c-nav-tabs__link' to={`/playlist/${url}/comments`}>Comments</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default PlaylistTabs;
