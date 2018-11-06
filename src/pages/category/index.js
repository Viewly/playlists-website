import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import VisibilitySensor from "react-visibility-sensor";

import { playlistsFetch, playlistsLoadMore } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";

const LIMIT = 12;

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query, page: 0, limit: LIMIT })),
  playlistsLoadMore: (query, page, limit) => dispatch(playlistsLoadMore({ query, page, limit })),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`slug=${params.categorySlug}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class CategoryPage extends Component {
  state = {
    page: 0,
    hasMore: true
  }

  componentDidMount() {
    const { playlistsFetch, match: { params: { categorySlug } } } = this.props;

    playlistsFetch(`slug=${categorySlug}`);
  }

  loadMore = async (visible) => {
    const { playlistsLoadMore, match: { params: { categorySlug } } } = this.props;

    if (visible === false) {
      return;
    }

    this.setState({ page: this.state.page + 1 }, async () => {
      const playlists = await playlistsLoadMore(`slug=${categorySlug}`, this.state.page, LIMIT);
      if (playlists.length < LIMIT) {
        this.setState({ hasMore: false });
      }
    })
  }

  render() {
    const { playlists, match: { params: { categorySlug } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <Playlist
          title={<><Link to="/categories">Categories</Link> <span className='c-heading-delimiter'>&rsaquo;</span> {categorySlug}</>}
          isLoaded={isReady}
          playlists={playlists.data.filter(i => i.category.slug === categorySlug)}
        />

        {isReady && this.state.hasMore && (
          <VisibilitySensor partialVisibility offset={{ bottom: -200 }} onChange={this.loadMore}>
            <button onClick={this.loadMore}>Load more</button>
          </VisibilitySensor>
        )}
      </div>
    );
  }
}
export default CategoryPage;
