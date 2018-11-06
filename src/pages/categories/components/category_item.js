import React, { Component } from "react";
import { Link } from "react-router-dom";

class CategoryItem extends Component {
  render() {
    const { slug, name } = this.props;

    return (
      <Link to={`/category/${slug}`} className='c-category c-categories-grid__box'>
        <div className='c-category__graphic'>
          <img src={require(`../../../images/categories-icons/category-${slug}.svg`)} />
          <img src={require(`../../../images/categories-icons/category-${slug}-hover.svg`)} />
        </div>
        <h3 className='c-category__title'>{name}</h3>
      </Link>
    );
  }
}
export default CategoryItem;
