import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import UserTabs from "./components/tabs";
import UserProfile from "./components/profile";
import UserPassword from "./components/password";
import UserCustomization from "./components/customization";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { userProfileFetch } from "../../actions/user";
import { asyncLoad } from "../../utils";

import { ACCOUNT_PAGE } from "../../constants/pages";

const prepareActions = (dispatch) => ({
  userProfileFetch: () => dispatch(userProfileFetch()),
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
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    user: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool
    ])
  }

  async componentDidMount() {
    const { userProfileFetch, isSSR, setClientRendered } = this.props;

    if (!isSSR) {
      await userProfileFetch();
    } else {
      setClientRendered();
    }
  }

  render() {
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <div className='o-grid o-grid--center o-grid--small'>
          <div className='o-grid__cell u-1/5'>
            <UserTabs />
          </div>
          <div className='o-grid__cell u-2/5'>
            <Route exact path='/account' component={UserProfile}></Route>
            <Route path='/account/password' component={UserPassword}></Route>
            <Route path='/account/customization' component={UserCustomization}></Route>
          </div>
        </div>
      </div>
    );
  }
}
export default AccountPage;
