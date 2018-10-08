import React, { Component } from "react";
import HeaderContainer from "../components/container/HeaderContainer/";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <HeaderContainer />
        <div>{children}</div>
        <div>Footer</div>
      </React.Fragment>
    );
  }
}
export default Layout;
