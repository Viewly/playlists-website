import React, { Component } from "react";
import CSSModules from 'react-css-modules';

import styles from './layout.scss';

@CSSModules(styles)
class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div styleName='wrapper'>
        {children}
      </div>
    );
  }
}
export default Layout;
