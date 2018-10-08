import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import CSSModules from 'react-css-modules';

import PlaylistSidebar from "./playlist/sidebar";
import HeaderContainer from "../components/container/HeaderContainer/";
import styles from './layout.scss';

@CSSModules(styles)
class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div styleName='wrapper'>
        <Route path='/playlist/:playlistId' component={PlaylistSidebar} />

        <div styleName='wrapper__content'>
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => <HeaderContainer {...props} isWide={false} />}
            />

            <Route
              path='/'
              render={(props) => <HeaderContainer {...props} isWide={true} />}
            />
          </Switch>

          <div>{children}</div>
          {/* <div>Footer</div> */}
        </div>
      </div>
    );
  }
}
export default Layout;
