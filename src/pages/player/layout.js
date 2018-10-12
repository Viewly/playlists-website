import React, { Component } from "react";

class Layout extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='wrapper'>
        {children}
      </div>
    );
  }
}
export default Layout;
