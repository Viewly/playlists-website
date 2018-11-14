import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {this.state.error && (
          <div className='c-thank-you'>
            <h5 className='u-margin-bottom-small'>An error occurred</h5>
            <p>{this.state.errorText}</p>
          </div>
        )}


        <div>
          <h1 className='c-form__title'>Log in to Vidflow</h1>

          <button onClick={this.googleLogin}>Login with Google</button>

          <form className='c-form' onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              <li>
                <label className='c-form__label'>Email address</label>
                <input className='c-input c-input--primary' type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} required />
              </li>
              <li>
                <label className='c-form__label'>Password</label>
                <input className='c-input c-input--primary' type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
              </li>
              <li className='u-text-right'>
                <button className='c-btn c-btn--primary'>Log In</button>
              </li>

              <p><Link to='/reset-password'>Forgot password?</Link></p>
              <p>Don&#x27;t have an account? <Link to='/register'>Get started</Link></p>


              <Link to='/'>RUN BACK TO HOME PAGE</Link>
            </ul>
          </form>
        </div>

      </div>
    );
  }
}
export default LoginPage;
