import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect }from "react-redux";
import { userProfileUpdatePassword } from "../../../actions/user";
import { withRouter, Link } from "react-router-dom";
import { OPEN_TOAST } from "../../../actions/toast";


@withRouter
@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  userProfileUpdatePassword: (data) => dispatch(userProfileUpdatePassword(data)),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data })
}))
class UserPassword extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  }

  state = {
    new_password: "",
    current_password: ""
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    const { userProfileUpdatePassword, history, openToast } = this.props;
    const { current_password, new_password } = this.state;

    this.setState({ error: false });
    evnt.preventDefault();
    const response = await userProfileUpdatePassword({ current_password, new_password });

    if (response.success) {
      // loginSuccess(response.user);
      openToast({ type: "success", message: "Password changed successfully" });
      history.push("/account");
    } else {
      openToast({ type: "error", message: response.message });
    }

  }

  render() {
    return (
      <div>
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
