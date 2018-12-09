import React, { Component } from "react";
import PropTypes from "prop-types";

class ToastItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    message: PropTypes.string,
    cta: PropTypes.string,
    onClose: PropTypes.func,
    autoClose: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool
    ])
  };

  static defaultProps = {
    autoClose: 3000
  }

  componentDidMount() {
    const { autoClose, onClose, id } = this.props;

    if (onClose && autoClose) {
      this.autoclose = setTimeout(() => {
        onClose && onClose(id);
      }, autoClose);
    }
  }

  componentWillUnmount() {
    this.autoclose && clearTimeout(this.autoclose);
  }

  render() {
    const { id, type, title, message, cta, onClose, onNew } = this.props;

    return (
      <div className={`c-toasts__toast c-alert c-alert--${type}`}>
        {onClose && (
          <span onClick={() => onClose(id)} className='c-alert__close'><img className='o-icon o-icon--tiny' src={require("../../../images/icons/close.svg")} /></span>
        )}
        <div className='o-flag o-flag--tiny'>
          <div className='o-flag__img u-align-top'>
            <img className='o-icon o-icon--small' src={require(`../../../images/icons/alert/alert-${type}.svg`)} />
          </div>
          <div className='o-flag__body'>
            <p>
              {title && <b>{title}</b>}
              {message && <> {message}</>}
              {cta && <a href=''>cta link</a>}

              {onNew && <button onClick={onNew}>SPAWN TOAST</button>}

            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ToastItem;
