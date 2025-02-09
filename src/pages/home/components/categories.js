import React, { Component } from "react";
import CategoryItem from "../../categories/components/category_item";
import { Link } from "react-router-dom";

export default class Categories extends Component {

  render() {
    const categories = [
      { slug: "education", name: "Education"},
      { slug: "science-and-technology", name: "Science & Technology"},
      { slug: "how-to-and-style", name: "How to & Style"},
      { slug: "gaming", name: "Gaming"},
      { slug: "comedy", name: "Comedy"},
      { slug: "music", name: "Music"},
    ];

    return (
      <div>
        <div className='o-grid o-grid--auto o-grid--middle o-grid--between u-margin-bottom'>
          <div className='o-grid__cell'>
            <h2 className='u-h4'>Top categories</h2>
          </div>
          <div className='o-grid__cell'>
            <Link className='c-link-secondary' to='/categories'>View All</Link>
          </div>
        </div>
        <div className='c-categories-grid c-categories-grid--home'>
          {categories.map((item, idx) => <CategoryItem key={`category-${idx}`} {...item} />)}
        </div>
      </div>
    );
  }
}
