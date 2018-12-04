import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthSidebar from "../../../components/authSidebar";

class ResetSuccess extends Component {
  render() {
    return (
      <div className='c-auth'>
        <AuthSidebar />

        <div className='c-auth__main'>

          <div className='c-auth__main__content'>
            <div className='c-thank-you'>
              <img className='c-thank-you__img' src={require("../../../images/graphic-success.svg")} />
              <h1 className='u-h3 u-margin-bottom-tiny'>Success</h1>
              <p>Password successfully changed</p>
              <Link to="/login" className='c-btn c-btn--secondary'>Click here to login</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ResetSuccess;
