import { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

@withRouter
class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.object,
    children: PropTypes.node,
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // temporary/dirty hack to prevent page jump on playlist page when switching tabs
      const prevLoc = prevProps.location.pathname.substring(0, 10);
      const thisLoc= this.props.location.pathname.substring(0, 10);

      if (prevLoc !== thisLoc) {
        window.scrollTo(0, 0);
      }
      // end hack :( 
    }
  }

  render() {
    return this.props.children;
  }
}

export default ScrollToTop;
