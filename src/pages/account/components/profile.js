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
          <div className='u-margin-bottom-large'>Email is NOT confirmed <button onClick={this.confirmationEmail}>Send confirmation email</button></div>
        )}

        <div className='u-margin-bottom-large'>
          <div className='o-flag'>
            <div className='o-flag__img'>
              {/*<img src={this.state.avatar_url} />*/}
              <img className='o-avatar o-avatar--huge' src={require("../../../images/avatar-default.jpg")} />
            </div>
            <div className='o-flag__body'>
              <button className='c-btn c-btn--secondary c-btn--hollow c-btn--small c-btn--padding-small u-margin-bottom-tiny' onClick={() => openLoginModal()}>Change image</button>
              <p class='c-annotation'>JPG, GIF or PNG. Max size of 800KB</p>
            </div>
          </div>
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
