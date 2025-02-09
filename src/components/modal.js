import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactModal from "react-modal";

export default class Modal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    title: PropTypes.string,
    children: PropTypes.node,
    showClose: PropTypes.bool,
    onClose: PropTypes.func
  }

  static defaultProps = {
    showClose: true
  }

  render() {
    const { isOpen, children, showClose, onClose } = this.props;

    return (
      <ReactModal
        closeTimeoutMS={100}
        isOpen={isOpen}
        ariaHideApp={false}
        className="c-modal__dialog"
        overlayClassName="c-modal"
        onRequestClose={onClose}>

        <div className="c-modal__content">
          {showClose && <div className='c-btn c-modal__btn-close' onClick={onClose}>&times;</div>}

          {children}
        </div>

      </ReactModal>

    );
  }
}
