import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Modal from "../modal";
import {
  userRegister,
  LOGIN_SUCCESS_PERSIST,
  CLOSE_LOGIN_MODAL,
  getSocialLoginUrl
} from "../../actions/user";

@withRouter
@connect((state) => ({
  modal: state.modals.register
}), (dispatch) => ({
  userRegister: (first_name, last_name, email, password) => dispatch(userRegister({ first_name, last_name, email, password })),
  getSocialLoginUrl: (platform) => dispatch(getSocialLoginUrl({ platform })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data }),
  closeModal: () => dispatch({ type: CLOSE_LOGIN_MODAL, data: { name: "register" } }),
}))
class RegisterModal extends Component {
  static propTypes = {
    modal: PropTypes.object,
    closeModal: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.object
  }

  state = {
    first_name: "",
    last_name: "",
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
    const { userRegister, closeModal, loginSuccess, history } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    // const response = await userLogin(this.state.email, this.state.password);
    const response = await userRegister(this.state.first_name, this.state.last_name, this.state.email, this.state.password);

    if (response.success) {
      loginSuccess(response.user);
      closeModal();
      history.push("/onboarding");
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
          <h3 className='c-modal__title'>Create an account</h3>
          <p>First, let&#x27;s get you set up so that you can <br/>enjoy distraction free videos.</p>
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
              <div className='o-grid'>
                <div className='o-grid__cell u-1/2@medium u-margin-bottom-large u-margin-bottom-none@medium'>
                  <label className='c-form__label'>First name</label>
                  <input className='c-input c-input--primary' type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                </div>
                <div className='o-grid__cell u-1/2@medium'>
                  <label className='c-form__label'>Last name</label>
                  <input className='c-input c-input--primary' type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                </div>
              </div>
            </li>
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
                  <p>Have an account? <Link to='/login'>Log in</Link></p>
                </div>
                <div className='o-grid__cell'>
                  <button type="submit" className='c-btn c-btn--secondary'>Next</button>
                </div>
              </div>
            </li>
          </ul>


        </form>
      </Modal>
    );
  }
}
export default RegisterModal;
