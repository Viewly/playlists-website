import React, { Component } from "react";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        Hello home
        <br />
        <Link to='/playlist/1'>Top10 cat videos</Link>
      </div>
    );
  }
}
export default HomePage;
