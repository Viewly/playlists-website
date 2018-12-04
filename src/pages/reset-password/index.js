import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ResetRequest from "./components/request";
import ResetRequested from "./components/requested";
import ResetCode from "./components/code";
import SEO from "../../components/SEO";

class ResetPasswordPage extends Component {
  render() {
    return (
      <>
        <SEO/>
        <Switch>
          <Route path='/reset-password/requested' component={ResetRequested}/>
          <Route path='/reset-password/:token' component={ResetCode}/>
          <Route path='/reset-password' component={ResetRequest}/>
        </Switch>
      </>
    );
  }
}

export default ResetPasswordPage;
