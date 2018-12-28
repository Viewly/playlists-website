import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { OPEN_LOGIN_MODAL, LOGOUT } from "../../actions/user";

@connect((state) => ({
  user: state.user
}))
class PromoPage extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    openLoginModal: PropTypes.func,
    openRegisterModal: PropTypes.func,
    logOut: PropTypes.func,
  }

  render() {
    const { openLoginModal, openRegisterModal, user, logOut } = this.props;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <div className='c-article'>
          <h1 className='u-h3'>Help us and earn 1 year premium membership!</h1>
          <p>We're passionate about making VidFlow the best website to discover community curated videos and watch them distraction free!</p>
          <p>In order to do so we need feedback from you, our early adopters. Help us and earn <b>1 year premium membership</b> by taking these two simple steps:</p>
          <ol>
            <li>Creating an account on VidFlow, and</li>
            <li>Taking our short survey</li>
          </ol>

          <p>Once you've created the account you'll find the link to the survey in your account dropdown menu.</p>

          <img className='u-margin-top' src={require("../../images/screenshot-take-the-survey.jpg")} />
        </div>
      </div>
    );
  }
}
export default PromoPage;
