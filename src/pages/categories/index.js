import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { categoriesFetch, SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { asyncLoad } from "../../utils";
import SEO from "../../components/SEO";

import CategoryItem from "./components/category_item";
import { CATEGORIES_PAGE } from "../../constants/pages";

const prepareActions = (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch()),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: CATEGORIES_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: CATEGORIES_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { categoriesFetch, setServerRendered } = prepareActions(store.dispatch);

  await categoriesFetch();
  setServerRendered();
})
@connect((state) => ({
  categories: state.categories,
  isSSR: !!state.renderedPages[CATEGORIES_PAGE]
}), prepareActions)
class CategoriesPage extends Component {
  static propTypes = {
    categoriesFetch: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    playlists: PropTypes.object
  }

  componentDidMount() {
    const { categoriesFetch, setClientRendered, isSSR } = this.props;

    if (!isSSR) {
      categoriesFetch();
    } else {
      setClientRendered();
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <div className="o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom">
        <SEO title="Browse categories" />

        <h1 className="u-h3">Browse categories</h1>
        <div className="c-categories-grid">
          {categories.data.map((item, idx) => <CategoryItem key={`category-${idx}`} {...item} />)}
        </div>
      </div>
    );
  }
}
export default CategoriesPage;
