import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { userEmailConfirm } from "../../actions/user";
import { asyncLoad, isLoaded } from "../../utils";

import { EMAIL_CONFIRM_PAGE } from "../../constants/pages";
import Loading from "../../components/loading";

const prepareActions = (dispatch) => ({
  userEmailConfirm: (token) => dispatch(userEmailConfirm({ token })),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: EMAIL_CONFIRM_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: EMAIL_CONFIRM_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { userEmailConfirm, setServerRendered } = prepareActions(store.dispatch);

  await userEmailConfirm(params.token);
  setServerRendered();
})
@connect((state) => ({
  emailConfirmation: state.emailConfirmation,
  isSSR: !!state.renderedPages[EMAIL_CONFIRM_PAGE]
}), prepareActions)
class EmailConfirmPage extends Component {
  static propTypes = {
    userEmailConfirm: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    emailConfirmation: PropTypes.object
  }

  async componentDidMount() {
    const { userEmailConfirm, isSSR, setClientRendered,  match: { params: { token } } } = this.props;

    if (!isSSR) {
      await userEmailConfirm(token);
    } else {
      setClientRendered();
    }
  }

  render() {
    const { emailConfirmation } = this.props;
    const isReady = isLoaded(emailConfirmation);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        {!isReady && <Loading />}
        {isReady && (
          <div>
            {emailConfirmation.success && (
              <div className='c-thank-you'>
                <img className='c-thank-you__img' src={require("../../images/graphic-success.svg")} />
                <h5 className='u-margin-bottom-small'>Email confirmed!</h5>
                <p>Thanks for confirming your email. You rock.</p>
              </div>
            )}
            {!emailConfirmation.success && (
              <div className='c-thank-you'>
                <img className='c-thank-you__img' src={require("../../images/graphic-error.svg")} />
                <h5 className='u-margin-bottom-small'>Something's wrong</h5>
                <p>Invalid or expired token.</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
export default EmailConfirmPage;
