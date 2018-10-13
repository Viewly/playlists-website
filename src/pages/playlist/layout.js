import React, { Component } from "react";
import HeaderContainer from "../../components/HeaderContainer";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <HeaderContainer />

        {children}
      </div>
    );
  }
}
export default Layout;
