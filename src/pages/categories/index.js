import React, { Component } from "react";
import { connect } from "react-redux";

import { categoriesFetch } from "../../actions";
import { asyncLoad } from "../../utils";
import SEO from "../../components/SEO";

import CategoryItem from "./components/category_item";

const prepareActions = (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch()),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { categoriesFetch } = prepareActions(store.dispatch);

  await categoriesFetch();
})
@connect((state) => ({
  categories: state.categories
}), prepareActions)
class CategoriesPage extends Component {
  componentDidMount() {
    const { categoriesFetch } = this.props;

    categoriesFetch();
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="Browse categories" />

        <h1 className='u-h3'>Browse categories</h1>
        <div className='c-categories-grid'>
          {categories.data.map((item, idx) => <CategoryItem key={`category-${idx}`} {...item} />)}
        </div>
      </div>
    );
  }
}
export default CategoriesPage;
