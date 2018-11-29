import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { OPEN_LOGIN_MODAL, LOGOUT } from "../../actions/user";
import Loading from "../../components/loading";

@connect((state) => ({
  user: state.user
}), (dispatch) => ({
  openLoginModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "login" } }),
  openRegisterModal: () => dispatch({ type: OPEN_LOGIN_MODAL, data: { name: "register" } }),
  logOut: () => dispatch({ type: LOGOUT }),
}))
class TestPage extends Component {
  static propTypes = {
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ]),
    openLoginModal: PropTypes.func,
    openRegisterModal: PropTypes.func,
    logOut: PropTypes.func,
  }

  render() {
    const { openLoginModal, openRegisterModal, user, logOut } = this.props;

    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h2>Test page</h2>
        <hr />

        <div className='o-wrapper'>
          <div className='u-margin-bottom-large'>
            <h2>Login/register modals</h2>

            <div>
              <button onClick={() => openLoginModal()}>Login</button>
              <button onClick={() => openRegisterModal()}>Register</button>
              <button onClick={() => logOut()}>Logout</button>
            </div>

          </div>
        </div>

        <hr />
        <div className='o-wrapper'>
          <div className='u-margin-bottom-large'>
            <h2>User data</h2>

            <div>
              {user && (
                <div>
                  Logged in as {user.email}
                  <div><textarea rows={5} cols={60} defaultValue={JSON.stringify(user)} readOnly /></div>
                </div>
              )}
              {!user && <span>Not logged in</span>}
            </div>
          </div>
        </div>

        <hr />
        <div className='o-wrapper'>
          <div className='u-margin-bottom-large'>
            <h2>Loading component</h2>
            <Loading />
          </div>
        </div>

      </div>
    );
  }
}
export default TestPage;
