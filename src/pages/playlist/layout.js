import React, { Component } from "react";
import HeaderContainer from "../../components/HeaderContainer";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='o-wrapper'>
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
