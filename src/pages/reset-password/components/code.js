import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import AuthSidebar from "../../../components/authSidebar";
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
      <div className='c-auth'>
        <AuthSidebar />
        <div className='c-auth__main'>

          <div className='c-auth__main__content'>

            <div className='c-auth__main__header'>
              <h1 className='u-h3 u-margin-bottom-tiny'>Reset password</h1>
            </div>

            {this.state.error && (
              <div className='c-thank-you'>
                <h5 className='u-margin-bottom-small'>An error occurred</h5>
                <p>{this.state.errorText}</p>
              </div>
            )}

            <form className='c-form' onSubmit={this.handleSubmit}>
              <ul className='c-form__list'>
                <li>
                  <label className='c-form__label'>Type new password</label>
                  <input className='c-input c-input--primary' type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                </li>

                <li>
                  <div className='o-grid o-grid--middle o-grid--auto o-grid--between'>
                    <div className='o-grid__cell'>
                      <Link to='/login'>&larr; Back to login</Link>
                    </div>
                    <div className='o-grid__cell'>
                      <button className='c-btn c-btn--primary'>Update password</button>
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
export default ResetCode;
