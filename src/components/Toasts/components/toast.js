import React, { Component } from "react";

class ToastItem extends Component {
  render() {
    const { type } = this.props;

    return (
      <div className={`c-toasts__toast c-alert c-alert--${type}`}>
        <span className='c-alert__close'><img className='o-icon o-icon--tiny' src={require("../../../images/icons/close.svg")} /></span>
        <div className='o-flag o-flag--tiny'>
          <div className='o-flag__img u-align-top'>
            <img className='o-icon o-icon--small' src={require(`../../../images/icons/alert/alert-${type}.svg`)} />
          </div>
          <div className='o-flag__body'>
            <p><b>Success!</b> This alert box indicates a successful or positive action. <a href=''>cta link</a></p>
          </div>
        </div>
      </div>
    );
  }
}

export default ToastItem;
