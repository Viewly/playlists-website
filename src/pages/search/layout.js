import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderContainer from "../../components/HeaderContainer";

class Layout extends Component {
  static propTypes = {
    children: PropTypes.object
  }

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
