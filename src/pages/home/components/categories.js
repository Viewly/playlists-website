import React, { Component } from "react";
import CategoryItem from "../../categories/components/category_item";

export default class Categories extends Component {

  render() {
    const categories = [
      { slug: 'gaming', name: 'Gaming'},
      { slug: 'education', name: 'Education'},
      { slug: 'how-to-and-style', name: 'How to & Style'},
      { slug: 'entertainment', name: 'Entertainment'},
      { slug: 'music', name: 'Music'},
      { slug: 'sports', name: 'Sports'},
    ];

    // <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <div className='o-grid__cell'>
          <h2 className='u-h3'>Categories</h2>
        </div>
        <div className='c-categories-grid'>
          {categories.map((item, idx) => <CategoryItem key={`category-${idx}`} {...item} />)}
        </div>
      </div>
    )
  }
}
