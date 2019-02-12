import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hashtagsFetch } from "../../actions";
import { asyncLoad } from "../../utils";
import SEO from "../../components/SEO";

import HashtagItem from "./components/hashtag_item";

const prepareActions = (dispatch) => ({
  hashtagsFetch: () => dispatch(hashtagsFetch()),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { hashtagsFetch } = prepareActions(store.dispatch);

  await hashtagsFetch();
})
@connect((state) => ({
  hashtags: state.hashtags
}), prepareActions)
class HashtagsPage extends Component {
  static propTypes = {
    hashtagsFetch: PropTypes.func.isRequired,
    hashtags: PropTypes.object
  }

  componentDidMount() {
    const { hashtagsFetch } = this.props;

    hashtagsFetch();
  }

  render() {
    const { hashtags } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="Discover popular hashtags" />

        <h1 className='u-h4'>Explore hashtags</h1>
        <div className='c-categories-grid c-categories-grid--hashtags'>
          {hashtags.data.map((item, idx) => <HashtagItem key={`category-${idx}`} {...item} />)}
        </div>
      </div>
    );
  }
}
export default HashtagsPage;
