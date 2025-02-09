import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Modal from "../modal";
import {
  userLogin,
  LOGIN_SUCCESS_PERSIST,
  CLOSE_LOGIN_MODAL,
  getSocialLoginUrl
} from "../../actions/user";

@withRouter
@connect((state) => ({
  modal: state.modals.login
}), (dispatch) => ({
  userLogin: (email, password) => dispatch(userLogin({ email, password })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data }),
  getSocialLoginUrl: (platform) => dispatch(getSocialLoginUrl({ platform })),
  closeModal: () => dispatch({ type: CLOSE_LOGIN_MODAL, data: { name: "login" } }),
}))
class LoginModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    closeModal: PropTypes.func,
    location: PropTypes.object
  }

  state = {
    email: "",
    password: "",
    error: false,
    errorText: ""
  }

  componentDidUpdate(prevProps) {
    const { modal, closeModal, location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      modal.isOpen && closeModal();
    }
  }

  socialLoginClick = (platform) => async () => {
    const { getSocialLoginUrl } = this.props;

    window.location.href = await getSocialLoginUrl(platform);
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userLogin, closeModal, loginSuccess } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userLogin(this.state.email, this.state.password);

    if (response.success) {
      loginSuccess(response.user);
      closeModal();
    } else {
      console.log("response", response);
      this.setState({
        error: true,
        errorText: response.reason
      });
    }
  }

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal isOpen={modal.isOpen} onClose={() => closeModal()}>

        <div className='c-modal__header'>
          <h3 className='c-modal__title'>Log in to Vidflow</h3>
        </div>
        {this.state.error && (
          <div className=''>
            <h5 className='u-margin-bottom-small'>An error occurred</h5>
            <p>{this.state.errorText}</p>
          </div>
        )}

        <div className='o-grid o-grid--small u-margin-bottom-large'>
          <div className='o-grid__cell u-1/2@medium'>
            <button className='c-btn c-btn--social c-btn--social--google c-btn--full' onClick={this.socialLoginClick("google")}>
              <img className='c-btn--social__logo' src={require("../../images/soc-networks-logos/logo-google.svg")} />
              Log in with Google
            </button>
          </div>
          <div className='o-grid__cell u-1/2@medium u-margin-top u-margin-top-none@medium'>
            <button className='c-btn c-btn--social c-btn--social--google c-btn--full' onClick={this.socialLoginClick("facebook")}>
              <img className='c-btn--social__logo' src={require("../../images/soc-networks-logos/logo-facebook.svg")} />
              Log in with Facebook
            </button>
          </div>
        </div>

        <form id='form-login' className='c-form' onSubmit={this.handleSubmit}>
          <ul className='c-form__list'>
            <li>
              <label className='c-form__label'>Email address</label>
              <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </li>
            <li>
              <label className='c-form__label'>Password</label>
              <input className='c-input c-input--primary' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            </li>
            <li>
              <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
                <div className='o-grid__cell'>
                  <p>Don&#x27;t have an account? <Link to='/register'>Get started</Link></p>
                </div>
                <div className='o-grid__cell'>
                  <button type="submit" className='c-btn c-btn--secondary'>Log in</button>
                </div>
              </div>
            </li>
          </ul>


        </form>
      </Modal>
    );
  }
}
export default LoginModal;
