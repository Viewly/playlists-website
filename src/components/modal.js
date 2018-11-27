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
    const { isOpen, title, children, showClose, onClose } = this.props;

    return (
      <ReactModal
        isOpen={isOpen}
        ariaHideApp={false}
        className="modal__style"
        overlayClassName="modal__overlay"
        onRequestClose={onClose}>

        {showClose && <div className='modal-close'><i className='spott-icon icon-close' onClick={onClose}>X</i></div>}
        <div className="modal-container">
          {title && <div className="modal-title">{title}</div>}

          {children}
        </div>

      </ReactModal>

    );
  }
}
