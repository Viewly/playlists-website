import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PROMOTION_HIDE } from "../actions";

@connect(null, (dispatch) => ({
  hidePromotion: () => dispatch({ type: PROMOTION_HIDE })
}))
export default class Promotion extends Component {
  render() {
    const { hidePromotion } = this.props;

    return (
      <div className='c-promotion-message'>
        <div className='o-wrapper c-promotion-message__grid'>
          <img className='c-promotion-message__img' src={require("../images/stars-color.svg")}/>
          <div className='c-promotion-message__text'>
            Join our giveaway and win some cool stuff!
            <Link to='/giveaway'>Learn more</Link>
          </div>
          <button className='c-btn c-promotion-message__btn-close' onClick={() => { hidePromotion() }}>&times;</button>
        </div>
      </div>
    );
  }
}
