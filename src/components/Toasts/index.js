import React, { Component } from "react";
import PropTypes from "prop-types";
import ToastItem from "./components/toast";

class Toasts extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <div className="toasts--container" style={{ border: '1px dashed black'}}>
        <ToastItem type="info" />
        <ToastItem type="warning" />
        <ToastItem type="success" />
      </div>
    );
  }
}

export default Toasts;
