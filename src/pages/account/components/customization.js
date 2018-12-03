import React, { Component } from "react";
import PropTypes from "prop-types";

class UserCustomization extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  }

  render() {
    return (
      <div>
        <h2>Customization yaya</h2>

      </div>
    );
  }
}
export default UserCustomization;
