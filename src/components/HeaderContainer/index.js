import React, { Component } from "react";
import CSSModules from "react-css-modules";
import { Link } from "react-router-dom";
import styles from './index.scss';

@CSSModules(styles)
class HeaderContainer extends Component {
  render() {
    const { isWide } = this.props;

    return (
      <div styleName='header'>
        {isWide && <div styleName='header__left'>
          <Link to='/'>&lt;</Link>
          <div>
            Search playlist
          </div>
        </div>}
        {!isWide && <div />}
        
        <div styleName='header__right'>
          <a href='#'>Log in</a>
          <a href='#'>Create account</a>
        </div>
      </div>
    );
  }
}
export default HeaderContainer;
