import React, { Component } from "react";
import PropTypes from "prop-types";

class UserPassword extends Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
    new_password: "",
    old_password: ""
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit = async (evnt) => {
    evnt.preventDefault();
    alert("SAVE");
  }

  render() {
    return (
      <div>

        <form className='c-form' onSubmit={this.handleSubmit}>
          <ul className='c-form__list c-form__list--large'>
            <li>
              <label className='c-form__label'>Old password</label>
              <input className='c-input c-input--primary' type="password" name="old_password" value={this.state.old_password} onChange={this.handleChange} />
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
