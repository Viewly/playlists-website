import React, { Component } from "react";
import PropTypes from "prop-types";

class CategoryItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onCategoryClick: PropTypes.func.isRequired,
  }

  render() {
    const { id, slug, name, onCategoryClick, isSelected } = this.props;

    return (
      <div to={`/category/${slug}`} className={`c-category c-categories-grid__box ${isSelected ? "is-selected" : ""}`} onClick={onCategoryClick(id)}>
        <div className='c-category__graphic'>
          <img src={require(`../../../images/categories-icons/category-${slug}.svg`)} />
          <img src={require(`../../../images/categories-icons/category-${slug}-hover.svg`)} />
        </div>
        <h3 className='c-category__title'>{name}</h3>
      </div>
    );
  }
}
export default CategoryItem;
