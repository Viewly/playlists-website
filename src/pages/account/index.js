import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

import UserTabs from "./components/tabs";
import UserProfile from "./components/profile";

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
      <div>
        <UserTabs />

        <div>
          <Route exact path='/account' component={UserProfile}></Route>
          <Route path='/account/password' component={UserProfile}></Route>
        </div>
      </div>
    );
  }
}
export default AccountPage;
