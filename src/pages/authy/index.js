import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";

import { LOGIN_SUCCESS_PERSIST, doSocialLogin } from "../../actions/user";
import Loading from "../../components/loading";
import { RegistrationEvent } from "../../gleam";

@connect(null, (dispatch) => ({
  doSocialLogin: (platform, params) => dispatch(doSocialLogin({ platform, params })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class AuthyPage extends Component {
  static propTypes = {
    doSocialLogin: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    location: PropTypes.object,
    history: PropTypes.object,
  }

  async componentDidMount() {
    const { doSocialLogin, loginSuccess, history, location: { search }, match: { params: { platform } } } = this.props;
    const params = queryString.parse(search);
    const response = await doSocialLogin(platform, params);

    console.log('params', params);
    console.log('platform', platform);
    console.log("RESPONSE", response);

    if (response && response.user) {
      loginSuccess(response.user);

      if (response.registered) {
        RegistrationEvent(response.user.email);
        history.push("/onboarding");
      } else {
        history.push("/");
      }
    }
  }

  render() {
    return (
      <div className='o-wrapper o-wrapper--narrow u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <Loading />
      </div>
    );
  }
}
export default AuthyPage;
