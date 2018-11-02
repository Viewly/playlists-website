import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryItem extends Component {
  render() {
    const { name } = this.props;

    return (
      <Link to={`/category/${encodeURIComponent(name)}`} className='c-category c-categories-grid__box'>
        <div className='c-category__graphic'>
          <img src={require('../../../images/category-gaming.svg')} />
          <img src={require('../../../images/category-gaming-hover.svg')} />
        </div>
        <h3 className='c-category__title'>{name}</h3>
      </Link>
    );
  }
}
export default CategoryItem;
