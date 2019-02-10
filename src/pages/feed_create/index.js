import React, { Component } from "react";
import { connect } from "react-redux";
import { zipObject, isEqual } from "lodash";
import { Link } from "react-router-dom";

import CategoryItem from "../onboarding/components/category_item";
import SubmitCounter from "../onboarding/components/submit_counter";

import { categoriesFetch } from "../../actions";
import { userSaveOnboarding, userGetOnboarding } from "../../actions/user";
import { isLoaded } from "../../utils";
import SEO from "../../components/SEO";

@connect((state) => ({
  categories: state.categories,
}), (dispatch) => ({
  categoriesFetch: () => dispatch(categoriesFetch()),
}))
export default class FeedCreatePage extends Component {
  state = {
    selected_categories: {}
  }

  componentDidMount() {
    const { onboarding, categories, userGetOnboarding, categoriesFetch } = this.props;

    isLoaded(categories) || categoriesFetch();
  }

  onCategoryClick = (id) => (evnt) => {
    const newSelected = { ...this.state.selected_categories, [id]: !this.state.selected_categories[id] };
    this.setState({ selected_categories: newSelected });
  }

  getSelectedIds = () => {
    return Object.keys(this.state.selected_categories).filter(item => this.state.selected_categories[item] === true).map(item => parseInt(item, 10));
  }

  saveOnboarding = async () => {
    const { history } = this.props;

    history.push("/register");
  }

  render() {
    const { categories } = this.props;
    const isReady = isLoaded(categories);

    return (
      <div className='c-fixed-footer-layout'>
        <SEO />

        <div className='c-fixed-footer-layout__header'>
          <div className='o-wrapper'>
            <h1 className='c-fixed-footer-layout__title u-margin-bottom'>Pick your interests</h1>
            <p>Choose at least 3 categories that you find interesting to help us find <br/>the right playlists for you.</p>

            <p>Already have an account? <Link to='/login'>Sign in</Link></p>
          </div>
        </div>
        <div className="o-wrapper">
          <div className="c-categories-grid">
            {categories.data.map((item, idx) => (
              <CategoryItem
                key={`category-${idx}`}
                onCategoryClick={this.onCategoryClick}
                isSelected={this.state.selected_categories[item.id] === true}
                {...item}
              />
            ))}
          </div>
        </div>

        <div className='c-fixed-footer-layout__footer'>
          <div className='o-wrapper c-fixed-footer-layout__wrapper  u-text-right'>

            {isReady && <SubmitCounter selected={this.getSelectedIds().length} onSave={this.saveOnboarding} />}
          </div>
        </div>

      </div>
    );
  }
}
