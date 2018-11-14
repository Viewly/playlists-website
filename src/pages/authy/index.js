import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";

import { doGoogleLogin, LOGIN_SUCCESS_PERSIST } from "../../actions/user";
import Loading from "../../components/loading";

@connect(null, (dispatch) => ({
  doGoogleLogin: (code) => dispatch(doGoogleLogin({ code })),
  loginSuccess: (data) => dispatch({ type: LOGIN_SUCCESS_PERSIST, data })
}))
class AuthyPage extends Component {
  static propTypes = {
    doGoogleLogin: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    location: PropTypes.object,
    history: PropTypes.object,
  }

  async componentDidMount() {
    const { doGoogleLogin, loginSuccess, history, location: { search } } = this.props;
    const values = queryString.parse(search);
    const response = await doGoogleLogin(values.code);

    console.log("RESPONSE", response);

    if (response && response.user) {
      loginSuccess(response.user);
      history.push("/");
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
