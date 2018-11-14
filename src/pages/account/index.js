import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { userProfileFetch, userEmailRequest } from "../../actions/user";
import { asyncLoad } from "../../utils";

import { ACCOUNT_PAGE } from "../../constants/pages";

const prepareActions = (dispatch) => ({
  userProfileFetch: () => dispatch(userProfileFetch()),
  userEmailRequest: (email) => dispatch(userEmailRequest({ email })),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: ACCOUNT_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: ACCOUNT_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { userProfileFetch, setServerRendered } = prepareActions(store.dispatch);

  await userProfileFetch();
  setServerRendered();
})
@connect((state) => ({
  user: state.user,
  isSSR: !!state.renderedPages[ACCOUNT_PAGE]
}), prepareActions)
class AccountPage extends Component {
  static propTypes = {
    userProfileFetch: PropTypes.func.isRequired,
    userEmailRequest: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    user: PropTypes.object
  }

  async componentDidMount() {
    const { userProfileFetch, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      await userProfileFetch();
    } else {
      setClientRendered();
    }
  }

  confirmationEmail = () => {
    const { user, userEmailRequest } = this.props;
    console.log("SEND");
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
export default AccountPage;
