import React, { Component } from "react";
import { connect } from "react-redux";
import { zipObject, isEqual } from "lodash";

import CategoryItem from "./components/category_item";
import { categoriesFetch } from "../../actions";
import { userSaveOnboarding, userGetOnboarding } from "../../actions/user";
import { isLoaded } from "../../utils";

const MIN_SELECTED_CATEGORIES = 3;

@connect((state) => ({
  categories: state.categories,
  onboarding: state.onboarding,
}), (dispatch) => ({
  userSaveOnboarding: (categories_ids) => dispatch(userSaveOnboarding({ categories_ids })),
  userGetOnboarding: () => dispatch(userGetOnboarding()),
  categoriesFetch: () => dispatch(categoriesFetch()),
}))
class OnboardingPage extends Component {
  state = {
    selected_categories: {}
  }

  componentDidMount() {
    const { onboarding, categories, userGetOnboarding, categoriesFetch } = this.props;

    onboarding && this.setState({ selected_categories: this.transformArrayToObject(onboarding.categories_ids) });
    isLoaded(categories) || categoriesFetch();
    userGetOnboarding();
  }

  componentDidUpdate(prevProps) {
    const { onboarding } = this.props;

    if (!isEqual(prevProps.onboarding, onboarding)) {
      this.setState({ selected_categories: this.transformArrayToObject(onboarding.categories_ids) });
    }
  }

  onCategoryClick = (id) => (evnt) => {
    const newSelected = { ...this.state.selected_categories, [id]: !this.state.selected_categories[id] };
    this.setState({ selected_categories: newSelected });
  }

  transformArrayToObject = (arr) => {
    return zipObject(arr, Array(arr.length).fill(true));
  }

  getSelectedIds = () => {
    return Object.keys(this.state.selected_categories).filter(item => this.state.selected_categories[item] === true).map(item => parseInt(item, 10));
  }

  allowNextStep = () => {
    return (this.getSelectedIds().length >= MIN_SELECTED_CATEGORIES);
  }

  saveOnboarding = async () => {
    const { userSaveOnboarding, history } = this.props;

    const response = await userSaveOnboarding(this.getSelectedIds());

    if (response.success) {
      history.push("/");
    }
  }

  render() {
    const { categories } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1>Let&#x27;s hack your brain</h1>
        <p>Please choose min 3 categories that you find interesting and help us find the right playlist for you</p>

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

        <button onClick={this.saveOnboarding} disabled={!this.allowNextStep()}>Save profile</button>

      </div>
    );
  }
}
export default OnboardingPage;
