import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import PlaylistSidebar from "./components/sidebar";
import HeaderContainer from "../../components/HeaderContainer";
import styles from './layout.scss';

@CSSModules(styles)
class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div styleName='wrapper'>
        <Route exact path='/playlist/:playlistId' component={PlaylistSidebar} />

        <div styleName='wrapper__content'>
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
