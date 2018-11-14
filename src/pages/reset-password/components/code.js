import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import { userForgotPasswordReset } from "../../../actions/user";

@withRouter
@connect(null, (dispatch) => ({
  userForgotPasswordReset: (token, password) => dispatch(userForgotPasswordReset({ token, password })),
}))
class ResetCode extends Component {
  static propTypes = {
    userForgotPasswordReset: PropTypes.func.isRequired,
    match: PropTypes.object
  }

  constructor (props) {
    super(props);

    this.state = {
      password: "",
      token: props.match.params.token
    };
  }


  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userForgotPasswordReset, history } = this.props;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userForgotPasswordReset(this.state.token, this.state.password);

    if (response.success) {
      history.push("/login");
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
          <h1 className='c-form__title'>Reset password</h1>

          <form className='c-form' onSubmit={this.handleSubmit}>
            <ul className='c-form__list'>
              <li>
                <label className='c-form__label'>Type new password</label>
                <input className='c-input c-input--primary' type="password" name="password" placeholder="New password" value={this.state.password} onChange={this.handleChange} required />
              </li>

              <li className='u-text-right'>
                <button className='c-btn c-btn--primary'>Update password</button>
              </li>

              <p><Link to='/login'>Back to login</Link></p>
            </ul>
          </form>
        </div>

      </div>
    );
  }
}
export default ResetCode;
