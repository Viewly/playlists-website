import React from "react";
import { Link } from "react-router-dom";

const AuthSidebar = () => (
  <div className='c-auth__sidebar'>
    <Link to='/' className='c-logo c-auth__logo'>
      <img className='c-logo__img' src={require("../images/logo-white.svg")} />
    </Link>
    <div className='c-auth__sidebar__content'>
      <h1 className='c-auth__sidebar__title'>Collaborative YouTube playlists</h1>
      <p>
        Discover playlists, create your own,
        and contribute to others.
      </p>
    </div>
  </div>
);

export default AuthSidebar;
