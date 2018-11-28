import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userEmailRequest } from "../../../actions/user";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  userEmailRequest: (email) => dispatch(userEmailRequest({ email })),
}))
class UserProfile extends Component {
  static propTypes = {
    userEmailRequest: PropTypes.func.isRequired,
    user: PropTypes.object
  }

  confirmationEmail = () => {
    const { user, userEmailRequest } = this.props;
    userEmailRequest(user.email);
  }

  render() {
    const { user } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'>My profile</h1>

        Email: {user.email}
        <br />
        First name: {user.first_name}
        <br />
        Last name: {user.last_name}
        <br />
        {!user.email_confirmed && (
          <div>Email is NOT confirmed <button onClick={this.confirmationEmail}>Send confirmation email</button></div>
        )}
      </div>
    );
  }
}
export default UserProfile;
