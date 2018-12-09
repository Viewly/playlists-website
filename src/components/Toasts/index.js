import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  CSSTransition,
  TransitionGroup,
} from "react-transition-group";

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

  closeToast = (id) => {
    const { closeToast } = this.props;
    closeToast(id);
  };

  // DEBUG REMOVE ME
  onNew = () => {
    const { openToast } = this.props;
    const types = ["success", "error", "warning", "info"];

    openToast({
      type: types[Math.floor(Math.random() * types.length)],
      title: "YaY",
      message: "This is a toast notification yay"
    });
  };

  render() {
    const { toasts } = this.props;

    return (
      <div className='c-toasts'>
        <TransitionGroup className="todo-list">
          {toasts.data.map((item) => (
            <CSSTransition
              key={item.id}
              timeout={300}
              classNames="fade"
            >
              <ToastItem onClose={this.closeToast} key={`toast-${item.id}`} type='success' {...item} />
            </CSSTransition>
          ))}

          {/* DEBUG */}
          {/*<ToastItem type='info' onNew={this.onNew}/>*/}

        </TransitionGroup>

      </div>
    );
  }
}

export default Toasts;
