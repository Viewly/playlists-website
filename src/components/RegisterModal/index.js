import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

import Modal from "../modal";
import { userRegister, getGoogleLoginUrl, LOGIN_SUCCESS_PERSIST, CLOSE_LOGIN_MODAL } from "../../actions/user";

@withRouter
@connect((state) => ({
  modal: state.modals.register
}), (dispatch) => ({
  userRegister: (name, email, password) => dispatch(userRegister({ name, email, password })),
  getGoogleLoginUrl: () => dispatch(getGoogleLoginUrl()),
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
    name: "",
    email: "",
    password: "",
    password2: "",
    error: false,
    errorText: ""
  }

  componentDidUpdate(prevProps) {
    const { closeModal, location } = this.props;

    if (location.pathname !== prevProps.location.pathname) {
      closeModal();
    }
  }

  googleLogin = async () => {
    const { getGoogleLoginUrl } = this.props;
    const response = await getGoogleLoginUrl();

    window.location.href = response.url;
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
    const response = await userRegister(this.state.name, this.state.email, this.state.password);

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

        <div className='u-margin-bottom-large'>
          <button className='c-btn c-btn--social c-btn--social--google c-btn--full' onClick={this.googleLogin}>
            <img className='c-btn--social__logo' src={require("../../images/soc-networks-logos/logo-google.svg")} />
            Log in with Google
          </button>
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
