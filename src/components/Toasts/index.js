import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ToastItem from "./components/toast";
import { CLOSE_TOAST, OPEN_TOAST } from "../../actions/toast";

@connect((state) => ({
  toasts: state.toasts
}), (dispatch) => ({
  closeToast: (id) => dispatch({ type: CLOSE_TOAST, data: id }),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),  // REMOVE ME PROBABLY
}))
class Toasts extends Component {
  static propTypes = {
    title: PropTypes.string,
    toasts: PropTypes.object
  };

  closeToast = (id) => (evnt) => {
    const { closeToast } = this.props;
    closeToast(id);
  };

  // DEBUG REMOVE ME
  onNew = () => {
    const { openToast } = this.props;
    const types = ['success', 'error', 'warning', 'info'];

    openToast({ type: types[Math.floor(Math.random()*types.length)], message: "This is a toast notification yay" });
  };

  render() {
    const { toasts } = this.props;

    return (
      <div className='c-toasts'>
        {toasts.data.map((item, idx) => (
          <ToastItem onClose={this.closeToast} key={`toast-${idx}`} type='success' {...item} />
        ))}

        {/* DEBUG */}
        <ToastItem type='info' onNew={this.onNew} />
      </div>
    );
  }
}

export default Toasts;
