import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import AuthSidebar from "../../../components/authSidebar";
import { userForgotPassword } from "../../../actions/user";

@withRouter
@connect(null, (dispatch) => ({
  userForgotPassword: (email) => dispatch(userForgotPassword({ email })),
}))
class ResetRequest extends Component {
  state = {
    email: "",
    error: false,
    errorText: "",
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userForgotPassword, history } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userForgotPassword(this.state.email);

    if (response.success) {
      history.push("/reset-password/requested");
    } else {
      console.log("response", response);
      this.setState({
        error: true,
        errorText: response.message
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
              <h1 className='u-h3 u-margin-bottom-tiny'>Forgot password?</h1>
              <p>Don't worry! Enter your email address and we'll get you back on track.</p>
            </div>

            {this.state.error && (
              <div className=''>
                <h5 className='u-margin-bottom-small'>An error occurred</h5>
                <p>{this.state.errorText}</p>
              </div>
            )}

            <form className='c-form' onSubmit={this.handleSubmit}>
              <ul className='c-form__list'>
                <li>
                  <label className='c-form__label'>Email address</label>
                  <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                </li>

                <li>
                  <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
                    <div className='o-grid__cell'>
                      <Link to='/login'>&larr; Back to login</Link>
                    </div>
                    <div className='o-grid__cell'>
                      <button className='c-btn c-btn--primary'>Send email</button>
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
        </div>

      </div>
    );
  }
}
export default ResetRequest;
