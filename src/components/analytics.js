import { Component } from "react";
import PropTypes from "prop-types";
import { matchPath, withRouter } from "react-router";

import { routes } from "../routes";
import { pageLoad, triggerEvent } from "../analytics";

@withRouter
class AnalyticsWrapper extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.node,
  }

  componentDidMount() {
    const route = this.getRoute(this.props.location.pathname);

    this.pageLoad(route);
    this.pageEnter(route);
  }

  componentDidUpdate(prevProps) {
    const fromRoute = this.getRoute(prevProps.location.pathname);
    const toRoute = this.getRoute(this.props.location.pathname);

    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (toRoute.path !== fromRoute.path) {
        this.pageLoad(toRoute);
      }

      this.pageEnter(toRoute);
      this.pageLeave(fromRoute, {
        toUrl: this.props.location.pathname,
        location: this.props.location,
        prevLocation: prevProps.location,
        fromRoute,
        toRoute
      });
    } else if (this.props.location.search !== prevProps.location.search) {
      this.pageEnter(toRoute);
    }
  }

  getRoute = (path) => {
    const matched = routes.filter(route => {
      return matchPath(path, route);
    });
    return matched && { ...matched[0], ...matchPath(path, matched[0]) };
  }

  pageLoad = (route) => {
    if (route.analytics && route.analytics.pageName) {
      pageLoad(route.analytics.pageName);
    }
  }

  pageEnter = (route) => {
    if (route.analytics && route.analytics.pageEnter) {
      triggerEvent(route.analytics.pageEnter, route);
    }
  }

  pageLeave = (route, data) => {
    if (route.analytics && route.analytics.pageLeave) {
      triggerEvent(route.analytics.pageLeave, data);
    }
  }
  render() {
    return this.props.children;
  }
}

export default AnalyticsWrapper;
