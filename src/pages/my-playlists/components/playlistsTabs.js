import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class PlaylistsTabs extends Component {
  render() {
    return (
      <nav className=''>
        <ul>
          <li className=''>
            <NavLink exact activeClassName='is-current' className="" to="/my-playlists">Published</NavLink>
            <NavLink activeClassName='is-current' className="" to="/my-playlists/drafts">Drafts</NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
export default PlaylistsTabs;
