import React, { Component } from "react";
import SEO from "../../components/SEO";

export default class GiveawayPage extends Component {
  componentDidMount () {
    const script = document.createElement("script");

    script.src = "https://js.gleam.io/e.js";
    script.async = true;

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="Giveaway" />
        
        <a className="e-widget no-button generic-loader" href="https://gleam.io/K1ioX/iberleezy-x-vidflow-giveaway" rel="nofollow">iBerleezy x Vidflow Giveaway</a>
      </div>
    );
  }
}
