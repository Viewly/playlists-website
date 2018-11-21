import React, { Component } from "react";
import PropTypes from "prop-types";

const MIN_SELECTED_CATEGORIES = 3;
const lang = {
  3: "Choose three categories",
  2: "Two more",
  1: "One more"
};

class SubmitCounter extends Component {
  static propTypes = {
    selected: PropTypes.number.isRequired,
    onSave: PropTypes.func.isRequired,
  }

  allowNextStep = () => {
    const { selected } = this.props;
    return (selected >= MIN_SELECTED_CATEGORIES);
  }

  render() {
    const { onSave, selected } = this.props;

    if (this.allowNextStep()) {
      return <button className='c-btn c-btn--primary' onClick={onSave}>Finish</button>;
    }

    return (
      <button className='c-btn c-btn--primary' disabled>{lang[MIN_SELECTED_CATEGORIES - selected]}</button>
    );
  }
}
export default SubmitCounter;
