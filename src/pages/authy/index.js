import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";

import { doGoogleLogin, LOGIN_SUCCESS_PERSIST, passLoginInfo } from "../../actions/user";
import Loading from "../../components/loading";
import { asyncLoad } from '../../utils';
import { playlistFetch } from '../../actions';



@connect(null, (dispatch) => ({
  passLoginInfo: (platform, params) => dispatch(passLoginInfo({ platform, params })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class AuthyPage extends Component {
  static propTypes = {
    passLoginInfo: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    location: PropTypes.object,
    history: PropTypes.object,
  }

  async componentDidMount() {
    console.log("Mounting....");
    const { passLoginInfo, loginSuccess, history, location: { search }, match: { params: { platform } } } = this.props;

    const params = queryString.parse(search);
    console.log(params, platform, "????")
    const response = await passLoginInfo(platform, params);

    console.log("RESPONSE", response);

    if (response && response.user) {
      loginSuccess(response.user);

      if (response.registered) {
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
