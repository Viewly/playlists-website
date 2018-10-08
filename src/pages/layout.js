import React, { Component } from "react";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <div>Header</div>
        <div>{children}</div>
        <div>Footer</div>
      </React.Fragment>
    );
  }
}
export default Layout;
