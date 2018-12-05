import React, { Component } from "react";

class ToastItem extends Component {
  render() {
    const { type } = this.props;

    return (
      <div className={`c-toasts__toast c-alert c-alert--${type}`}>
        <span>X</span>
        <p><b>Success!</b> This alert box indicates a successful or positive action.</p>
        <div>
          <button>CTA button</button>
        </div>
      </div>
    );
  }
}

export default ToastItem;
