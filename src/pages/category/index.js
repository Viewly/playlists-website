import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { playlistsFetch, PLAYLIST_INJECT_DATA } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../home/components/playlist";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query })),
  injectPlaylist: (data) => dispatch({ type: PLAYLIST_INJECT_DATA, data })
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`category=${encodeURIComponent(params.categoryId)}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class CategoryPage extends Component {
  componentDidMount() {
    const { playlistsFetch, match: { params: { categoryId } }  } = this.props;

    playlistsFetch(`category=${encodeURIComponent(categoryId)}`);
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history, injectPlaylist, playlists } = this.props;
    const selectedPlaylist = playlists.data.find(item => item.url === url);

    evnt.preventDefault();
    injectPlaylist(selectedPlaylist);
    history.push(`/playlist/${url}`);
  }

  render() {
    const { playlists, match: { params: { categoryId } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
      <h1 className='u-h3'>Categories <span className='c-heading-delimiter'>&rsaquo;</span> {categoryId}</h1>

        <Playlist title="" isLoaded={isReady} data={playlists.data.filter(i => i.category === categoryId)} onPlaylistClick={this.onPlaylistClick} />
      </div>
    );
  }
}
export default CategoryPage;
