import React, { Component } from "react";
import SEO from "../../components/SEO";

export default class GiveawayPage extends Component {
  render() {
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="Giveaway" />

        <iframe style={{ width: '100%', height: 'calc(100vh - 200px)' }} src="https://gleam.io/K1ioX/iberleezy-x-vidflow-giveaway" frameBorder="0" allowFullScreen />
      </div>
    );
  }
}
