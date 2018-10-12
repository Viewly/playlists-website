import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import PlaylistSidebar from "./components/sidebar";
import HeaderContainer from "../../components/HeaderContainer";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='o-wrapper'>
        <Route exact path='/playlist/:playlistId' component={PlaylistSidebar} />

        <div className='wrapper__content'>
          <HeaderContainer />
          <div>
            {children}
          </div>
        </div>
      </div>
    );
  }
}
export default Layout;
