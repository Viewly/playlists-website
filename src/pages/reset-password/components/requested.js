import React, { Component } from "react";
import AuthSidebar from "../../../components/authSidebar";

class ResetRequested extends Component {
  render() {
    return (
      <div className='c-auth'>
        <AuthSidebar />

        <div className='c-auth__main'>

          <div className='c-auth__main__content'>
            <div className='c-thank-you'>
              <img className='c-thank-you__img' src={require("../../../images/graphic-success.svg")} />
              <h1 className='u-h3 u-margin-bottom-tiny'>Instructions successfully sent</h1>
              <p>Please check your email for further instructions.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetRequested;
