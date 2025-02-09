import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userEmailRequest, OPEN_LOGIN_MODAL, userProfileUpdate, LOGIN_SUCCESS_PERSIST } from "../../../actions/user";
import { OPEN_TOAST } from "../../../actions/toast";
import UserAvatar from "./avatar";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  userProfileUpdate: (data) => dispatch(userProfileUpdate(data)),
  userEmailRequest: (email) => dispatch(userEmailRequest({ email })),
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "upload" } }),
  openToast: (data) => dispatch({ type: OPEN_TOAST, data }),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class UserProfile extends Component {
  static propTypes = {
    userEmailRequest: PropTypes.func.isRequired,
    userProfileUpdate: PropTypes.func.isRequired,
    openLoginModal: PropTypes.func,
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  };

  constructor(props) {
    super(props);

    this.state = {
      alias: props.user.alias,
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
  };

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  };

  handleSubmit = async (evnt) => {
    const { userProfileUpdate, openToast, loginSuccess } = this.props;
    const { first_name, last_name, alias } = this.state;

    evnt.preventDefault();
    const response = await userProfileUpdate({ alias, first_name, last_name });
    if (response.success) {
      openToast({ type: "success", message: "Profile saved successfully" });
      loginSuccess(response.user);
    } else {
      openToast({ type: "error", message: response.message });
    }
  };

  updateAvatar = async (avatar_url) => {
    this.setState({ avatar_url });
  }

  render() {
    const { user } = this.props;

    return (
      <div>

        {!this.state.email_confirmed && (
          <div className='c-alert c-alert--warning u-margin-bottom-large'>
            <div className='o-flag o-flag--tiny'>
              <div className='o-flag__img u-align-top'>
                <img className='o-icon o-icon--small' src={require('../../../images/icons/alert/alert-warning.svg')} />
              </div>
              <div className='o-flag__body'>
                <h4 className='c-alert__title'>Email not verified</h4>
                <p>We've sent you an email with the confirmation link. It might take up to 5 minutes to arrive. If you don't see it yet check your spam{/* or <button className='c-btn c-alert__btn' onClick={this.confirmationEmail}>send it again</button>*/}.
                </p>
              </div>
            </div>
          </div>
        )}

        {user.alias && (
          <div className='u-margin-bottom-large'>
            <UserAvatar onChange={this.updateAvatar} avatar_url={this.state.avatar_url}/>
          </div>
        )}

        <form className='c-form' onSubmit={this.handleSubmit}>
          <ul className='c-form__list c-form__list--large'>
            <li>
              <label className='c-form__label'>Username</label>
              <input className='c-input c-input--primary' type="text" name="alias" value={this.state.alias} onChange={this.handleChange} />
            </li>

            <li>
              <div className='o-grid'>
                <div className='o-grid__cell u-1/2@medium u-margin-bottom-large u-margin-bottom-none@medium'>
                  <label className='c-form__label'>First name</label>
                  <input className='c-input c-input--primary' type="text" name="first_name"
                         value={this.state.first_name} onChange={this.handleChange}/>
                </div>
                <div className='o-grid__cell u-1/2@medium'>
                  <label className='c-form__label'>Last name</label>
                  <input className='c-input c-input--primary' type="text" name="last_name" value={this.state.last_name}
                         onChange={this.handleChange}/>
                </div>
              </div>
            </li>

            <li>
              <label className='c-form__label'>Your email address</label>
              <input className='c-input c-input--primary' type="email" name="email" value={this.state.email} readOnly required/>
            </li>
            <li>
              <div className='o-grid o-grid--tiny o-grid--auto o-grid--middle o-grid--between'>
                <div className='o-grid__cell'>
                  {/*<button className='c-btn c-btn--plain c-btn--danger c-btn--with-icon'>
                    <img className='o-icon o-icon--small u-margin-right-tiny' src={require("../../../images/icons/delete.svg")} />
                    Delete account
                  </button>*/}
                </div>
                <div className='o-grid__cell'>
                  <button className='c-btn c-btn--secondary'>Save Changes</button>
                </div>
              </div>

            </li>
          </ul>
        </form>

      </div>
    );
  }
}

export default UserProfile;
