import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect }from "react-redux";
import { userProfileUpdatePassword } from "../../../actions/user";
import { withRouter, Link } from "react-router-dom";


@withRouter
@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  userProfileUpdatePassword: (data) => dispatch(userProfileUpdatePassword(data))
}))
class UserPassword extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
    new_password: "",
    current_password: "",
    error: false,
    errorText: ""
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userProfileUpdatePassword, history } = this.props;
    const { current_password, new_password } = this.state;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userProfileUpdatePassword({ current_password, new_password });

    if (response.success) {
      // loginSuccess(response.user);
      history.push("/account");
    } else {
      this.setState({
        error: true,
        errorText: response.message
      });
    }

  }

  render() {
    return (
      <div>
        {this.state.error && (
          <div className=''>
            <h5 className='u-margin-bottom-small'>An error occurred</h5>
            <p>{this.state.errorText}</p>
          </div>
        )}

        <form className='c-form' onSubmit={this.handleSubmit}>
          <ul className='c-form__list'>
            <li>
              <label className='c-form__label'>Current password</label>
              <input className='c-input c-input--primary' type="password" name="current_password" value={this.state.current_password} onChange={this.handleChange} />
              <div className='c-annotation u-text-right u-margin-top-tiny'>
                <Link to='/reset-password'>Forgot current password?</Link>
              </div>
            </li>
            <li>
              <label className='c-form__label'>New password</label>
              <input className='c-input c-input--primary' type="password" name="new_password" value={this.state.new_password} onChange={this.handleChange} />
            </li>

            <li className='u-text-right'>
              <button className='c-btn c-btn--secondary'>Change password</button>
            </li>
          </ul>
        </form>

      </div>
    );
  }
}
export default UserPassword;
