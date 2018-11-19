import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import AuthSidebar from "../../components/authSidebar";
import { userLogin, LOGIN_SUCCESS_PERSIST, getGoogleLoginUrl } from "../../actions/user";

@connect(null, (dispatch) => ({
  userLogin: (email, password) => dispatch(userLogin({ email, password })),
  getGoogleLoginUrl: () => dispatch(getGoogleLoginUrl()),
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
    const { getGoogleLoginUrl } = this.props;
    const test = await getGoogleLoginUrl();

    // console.log("YA", test);
    window.location.href = test.url;
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

        <div className='c-auth__main'>

          <div className='c-auth__main__content'>
            <div className='c-auth__main__header'>
              <h1 className='u-h3 u-margin-bottom-tiny'>Log in to Vidflow</h1>
            </div>

            {this.state.error && (
              <div className=''>
                <h5 className='u-margin-bottom-small'>An error occurred</h5>
                <p>{this.state.errorText}</p>
              </div>
            )}

            <div className='u-margin-bottom-large'>
              <button className='c-btn c-btn--social c-btn--social--google' onClick={this.googleLogin}>
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
                <li><Link to='/reset-password'>Forgot password?</Link></li>
              </ul>
            </form>
          </div>
        </div>

        <div className='c-auth__footer'>
          <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
            <div className='o-grid__cell'>
              <p>Don't have an account? <Link to='/register'>Get started</Link></p>
            </div>
            <div className='o-grid__cell'>
              <button form='form-login' className='c-btn c-btn--primary'>Log in</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
export default LoginPage;
