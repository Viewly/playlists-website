import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
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
import CropModal from "./components/CropModal";

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
        <CropModal />

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

@connect((state) => ({
  user: state.user
}))
class LayoutWithHeader extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className={`has-header ${!user ? 'has-promotion-message' : ''}`}>
        {!user && (
          <div className='c-promotion-message'>
            <div className='o-wrapper c-promotion-message__grid'>
              <img className='c-promotion-message__img' src={require("./images/stars-color.svg")} />
              <div className='c-promotion-message__text'>
                Help us make VidFlow better and earn 1 year free membership! <Link to='/promo-early-adopters'>Learn more</Link>
              </div>
            </div>
          </div>
        )}
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
