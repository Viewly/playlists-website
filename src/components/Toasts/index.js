import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToastItem from './components/toast';

class Toasts extends Component {
  static propTypes = {
    title: PropTypes.string,
  }

  render() {
    return (
      <div className='c-toasts'>
        <ToastItem type='info' />
        <ToastItem type='warning' />
        <ToastItem type='success' />
        <ToastItem type='error' />
      </div>
    );
  }
}

export default Toasts;
