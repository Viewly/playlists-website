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
          <h1 className='u-h3'>Help us and earn free membership!</h1>
          <p>We're passionate to make VidFlow the best website to discover community curated videos and watch them distraction free!</p>
          <p>In order to do so we need feedback from you, our early adopters. Help us and earn <b>1 year free membership</b> by taking these two simple steps:</p>
          <ol>
            <li>Creating an account on VidFlow, and</li>
            <li>Taking our short survey</li>
          </ol>

          <p>Once you've created the account you'll find the link to the survey in the user menu dropdown.</p>

          <img className='c-promotion-message__img u-2/3 u-3/5@medium u-1/2@large' src={require("../../images/take-the-survey-screenshot.jpg")} />
        </div>
      </div>
    );
  }
}
export default PromoPage;
