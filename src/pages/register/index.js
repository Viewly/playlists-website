import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userRegister, LOGIN_SUCCESS_PERSIST } from "../../actions/user";

@connect(null, (dispatch) => ({
  userRegister: (name, email, password) => dispatch(userRegister({ name, email, password })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class RegistrationPage extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    error: false,
    errorText: ""
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userRegister, loginSuccess, history } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userRegister(this.state.name, this.state.email, this.state.password);

    if (response.success) {
      loginSuccess(response.user);
      history.push("/onboarding");
    } else {
      this.setState({
        error: true,
        errorText: response.reason
      });
    }
  }

  render() {
    return (
      <div className='c-auth'>
        <div className='c-auth__sidebar'>
          <Link to='/' className='c-logo c-auth__logo'>
            <img className='c-logo__img' src={require("../../images/logo-white.svg")} />
          </Link>
          <div className='c-auth__sidebar__content'>
            <h1 className='c-auth__sidebar__title'>Collaborative YouTube playlists</h1>
            <p>
              Discover playlists, create your own,
              and contribute to others.
            </p>
          </div>
        </div>

        <div className='c-auth__main'>

          <div className='c-auth__main__content'>
            <div className='c-auth__main__header' data-step='01.'>
              <h1 className='u-h3 u-margin-bottom-tiny'>Welcome to Vidflow!</h1>
              <p>First, let’s get you set up so you can enjoy distraction free videos.</p>
            </div>

            {this.state.error && (
              <div className='c-thank-you'>
                <h5 className='u-margin-bottom-small'>An error occurred</h5>
                <p>{this.state.errorText}</p>
              </div>
            )}

            <button onClick={this.googleLogin}>Login with Google</button>

            <form className='c-form' onSubmit={this.handleSubmit}>
              <ul className='c-form__list'>
                {/* <li>
                  <label className='c-form__label'>Your name</label>
                  <input className='c-input c-input--primary' type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                </li> */}
                <li>
                  <label className='c-form__label'>Email address</label>
                  <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </li>
                <li>
                  <label className='c-form__label'>Password</label>
                  <input className='c-input c-input--primary' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </li>
                <li>
                  <label className='c-form__label'>Confirm password</label>
                  <input className='c-input c-input--primary' type="password" name="password2" value={this.state.password2} onChange={this.handleChange} required />
                </li>
              </ul>
            </form>
          </div>

        </div>

        <div className='c-auth__footer'>
          <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
            <div className='o-grid__cell'>
              <p>Already have an account? <Link to='/login'>Log in</Link></p>
            </div>
            <div className='o-grid__cell'>
              <button className='c-btn c-btn--primary'>Next</button>
            </div>

          </div>

        </div>
      </div>
    );
  }
}
export default RegistrationPage;
