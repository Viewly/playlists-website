import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CategoryItem extends Component {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { slug, name } = this.props;

    return (
      <Link to={`/category/${slug}`} className='c-category c-categories-grid__box has-colored-icon'>
        <div className='c-category__graphic c-colored-icon'>
          <img className='c-colored-icon__icon' src={require(`../../../images/icons/categories/category-${slug}.svg`)} />
          <img className='c-colored-icon__icon' src={require(`../../../images/icons/categories/category-${slug}-hover.svg`)} />
        </div>
        <h3 className='c-category__title'>{name}</h3>
      </Link>
    );
  }
}
export default CategoryItem;
