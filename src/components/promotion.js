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
            Help us make Vidflow better and earn 1 year premium membership!
            <Link to='/promo-early-adopters'>Learn more</Link>
          </div>
          <button className='c-btn c-promotion-message__btn-close' onClick={() => { hidePromotion() }}>&times;</button>
        </div>
      </div>
    );
  }
}
