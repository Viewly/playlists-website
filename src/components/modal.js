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
        closeTimeoutMS={100}
        isOpen={isOpen}
        ariaHideApp={false}
        className="c-modal__dialog"
        overlayClassName="c-modal"
        onRequestClose={onClose}>

        <div className="c-modal__content">
          {showClose && <div className='c-btn c-modal__btn-close'><i className='spott-icon icon-close' onClick={onClose}>&times;</i></div>}
          {title && <div className="modal-title">{title}</div>}

          {children}
        </div>

      </ReactModal>

    );
  }
}
