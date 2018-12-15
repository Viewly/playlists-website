import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AuthSidebar from "../../components/authSidebar";
import { userLogin, LOGIN_SUCCESS_PERSIST, getGoogleLoginUrl, doGoogleLogin } from "../../actions/user";
import SEO from "../../components/SEO";

@connect(null, (dispatch) => ({
  userLogin: (email, password) => dispatch(userLogin({ email, password })),
  doGoogleLogin: () => dispatch(doGoogleLogin()),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error: false,
    errorText: ""
  }

  googleLogin = async () => {
    const { doGoogleLogin } = this.props;
    const response = await doGoogleLogin();

    window.location.href = response.url;
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userLogin, history, loginSuccess } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userLogin(this.state.email, this.state.password);

    if (response.success) {
      loginSuccess(response.user);
      history.push("/");
    } else {
      console.log("response", response);
      this.setState({
        error: true,
        errorText: response.reason
      });
    }
  }

  render() {
    return (
      <div className='c-auth'>
        <AuthSidebar />
        <SEO title="Welcome to VidFlow" />

        <div className='c-auth__main'>

          <div className='c-auth__main__content'>
            <div className='c-auth__main__header'>
              <h1 className='u-h3 u-margin-bottom-tiny'>Log in to Vidflow</h1>
            </div>

            <div className='u-margin-bottom-large'>
              <button className='c-btn c-btn--social c-btn--social--google c-btn--full' onClick={this.googleLogin}>
                <img className='c-btn--social__logo' src={require("../../images/soc-networks-logos/logo-google.svg")} />
                Log in with Google
              </button>
            </div>

            {this.state.error && (
              <div className='c-alert c-alert--error u-margin-bottom'>
                <div className='o-flag o-flag--tiny'>
                  <div className='o-flag__img u-align-top'>
                    <img className='o-icon o-icon--small' src={require('../../images/icons/alert/alert-error.svg')} />
                  </div>
                  <div className='o-flag__body'>
                    <p>{this.state.errorText}</p>
                  </div>
                </div>
              </div>
            )}

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
                <li className='u-text-right'><Link to='/reset-password'>Forgot password?</Link></li>
              </ul>
            </form>
          </div>
        </div>

        <div className='c-auth__footer'>
          <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
            <div className='o-grid__cell'>
              <p>Don&#x27;t have an account? <Link to='/register'>Get started</Link></p>
            </div>
            <div className='o-grid__cell'>
              <button form='form-login' className='c-btn c-btn--secondary'>Log in</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default LoginPage;
