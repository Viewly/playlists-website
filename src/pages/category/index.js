import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistsFetch } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query }))
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`slug=${params.categorySlug}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class CategoryPage extends Component {
  componentDidMount() {
    const { playlistsFetch, match: { params: { categorySlug } }  } = this.props;

    playlistsFetch(`slug=${categorySlug}`);
  }

  render() {
    const { playlists, match: { params: { categorySlug } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <h1 className='u-h3'><Link to="/categories">Categories</Link> <span className='c-heading-delimiter'>&rsaquo;</span> {categorySlug}</h1>
        <Playlist title="" isLoaded={isReady} playlists={playlists.data.filter(i => i.category === categoryId)} />
      </div>
    );
  }
}
export default CategoryPage;
