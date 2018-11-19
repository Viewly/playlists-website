import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

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
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {this.state.error && (
          <div className='c-thank-you'>
            <h5 className='u-margin-bottom-small'>An error occurred</h5>
            <p>{this.state.errorText}</p>
          </div>
        )}

        <div>
          <h1 className='c-form__title'>Forgot password</h1>

          <form className='c-form' onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              <li>
                <label className='c-form__label'>Email address</label>
                <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
              </li>

              <li className='u-text-right'>
                <button className='c-btn c-btn--primary'>Send email</button>
              </li>

              <p><Link to='/login'>Back to login</Link></p>
            </ul>
          </form>
        </div>

      </div>
    );
  }
}
export default ResetRequest;
