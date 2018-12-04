import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import HeaderContainer from "./components/HeaderContainer";
import { routes } from "./routes";
import { FirstLoadEvent, SetUserId } from "./analytics";

import LoginModal from "./components/LoginModal";
import UploadModal from "./components/UploadModal";
import RegisterModal from "./components/RegisterModal";
import Toasts from "./components/Toasts";

@withRouter
@connect((state) => ({
  user: state.user
}))
class App extends Component {
  componentDidMount() {
    const { user } = this.props;

    FirstLoadEvent();
    SetUserId(user?.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user?.id !== prevProps.user?.id) {
      SetUserId(this.props.user?.id);
    }
  }

  render() {
    return (
      <>
        <LoginModal />
        <UploadModal />
        <RegisterModal />

        <Switch>
          {routes.filter(item => item.fullscreen).map((route, idx) => (
            <Route key={`fullscreen-route-${idx}`} {...route} />
          ))}
          <Route component={LayoutWithHeader} />
        </Switch>
      </>
    );
  }
}

class LayoutWithHeader extends Component {
  render() {
    return (
      <div className='has-header'>
        <HeaderContainer />
        <Toasts />
        <>
          {routes.map((route, idx) => (
            <Route key={`route-${idx}`} {...route} />
          ))}
        </>
      </div>
    );
  }
}

export default hot(module)(App);
