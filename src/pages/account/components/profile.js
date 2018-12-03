import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userEmailRequest, OPEN_LOGIN_MODAL } from "../../../actions/user";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  userEmailRequest: (email) => dispatch(userEmailRequest({ email })),
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "upload" } }),
}))
class UserProfile extends Component {
  static propTypes = {
    userEmailRequest: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      email: props.user.email,
      first_name: props.user.first_name,
      last_name: props.user.last_name,
      email_confirmed: props.user.email_confirmed,
      avatar_url: props.user.avatar_url
    };
  }

  confirmationEmail = () => {
    const { user, userEmailRequest } = this.props;
    userEmailRequest(user.email);
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
    const { openLoginModal } = this.props;

    return (
      <div>

        {!this.state.email_confirmed && (
          <div>Email is NOT confirmed <button onClick={this.confirmationEmail}>Send confirmation email</button></div>
        )}

        <div style={{ maxWidth: "200px" }}>
          <img src={this.state.avatar_url} />
          <button onClick={() => openLoginModal()}>Change image</button>
          <p>JPG, GIF or PNG. Max size of 800KB</p>
        </div>

        <form className='c-form' onSubmit={this.handleSubmit}>
          <ul className='c-form__list c-form__list--large'>
            <li>
              <div className='o-grid'>
                <div className='o-grid__cell u-1/2@medium u-margin-bottom-large u-margin-bottom-none@medium'>
                  <label className='c-form__label'>First name</label>
                  <input className='c-input c-input--primary' type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
                </div>
                <div className='o-grid__cell u-1/2@medium'>
                  <label className='c-form__label'>Last name</label>
                  <input className='c-input c-input--primary' type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
                </div>
              </div>
            </li>

            <li>
              <label className='c-form__label'>Your email address</label>
              <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            </li>
            <li className='u-text-right'>
              <button className='c-btn c-btn--secondary'>Save Changes</button>
            </li>
          </ul>
        </form>

      </div>
    );
  }
}
export default UserProfile;
