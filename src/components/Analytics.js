import { Component } from "react";
import { triggerEvent } from "../analytics";

class AnalyticsWrapper extends Component {

  componentDidUpdate(prevProps) {
    console.log("UPDATE", this.props);
  }

  componentDidMount() {
    const { analytics } = this.props;
    console.log("MOUNT");
    if (analytics) {
      analytics.event_type && triggerEvent(analytics.event_type);
    }
    // const route = routes.find(item => item.path === this.props.match.path);
    // console.log("MOUNT", this.props);
    // console.log("ENTER", route.path, route.analytics);
  }

  componentWillUnmount() {
    // const route = routes.find(item => item.path === this.props.match.path);

    // console.log("EXIT", route.path, route.analytics);
  }

  render() {
    return null;
  }
}

export default AnalyticsWrapper;
