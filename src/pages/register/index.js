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
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {this.state.error && (
          <div className='c-thank-you'>
            <h5 className='u-margin-bottom-small'>An error occurred</h5>
            <p>{this.state.errorText}</p>
          </div>
        )}


        <div>
          <h1 className='c-form__title'>Create your account</h1>
          <form className='c-form' onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              {/* <li>
                <label className='c-form__label'>Your name</label>
                <input className='c-input c-input--primary' type="text" name="name" placeholder="Enter your name" value={this.state.name} onChange={this.handleChange} required />
              </li> */}
              <li>
                <label className='c-form__label'>Email address</label>
                <input className='c-input c-input--primary' type="email" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange} required />
              </li>
              <li>
                <label className='c-form__label'>Password</label>
                <input className='c-input c-input--primary' type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
              </li>
              <li>
                <label className='c-form__label'>Confirm password</label>
                <input className='c-input c-input--primary' type="password" name="password2" placeholder="Confirm password" value={this.state.password2} onChange={this.handleChange} required />
              </li>
              <li className='u-text-right'>
                <button className='c-btn c-btn--primary'>Create account</button>
              </li>

              <p>Already have an account? <Link to='/login'>Log in</Link></p>

              <Link to='/'>RUN BACK TO HOME PAGE</Link>
            </ul>
          </form>
        </div>

      </div>
    );
  }
}
export default RegistrationPage;
