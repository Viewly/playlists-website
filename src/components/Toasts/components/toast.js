import React, { Component } from "react";

class ToastItem extends Component {
  render() {
    const { type } = this.props;

    return (
      <div className={`toast toast--${type}`} style={{ border: '1px solid pink' }}>
        <span>X</span>
        <h2>Toast header</h2>
        <p>Toast text</p>
      </div>
    );
  }
}

export default ToastItem;
