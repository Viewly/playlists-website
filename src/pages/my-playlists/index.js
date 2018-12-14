import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMyPlaylists } from "../../actions/user";
import { asyncLoad } from "../../utils";

import { Route } from "react-router-dom";
import MyPlaylistsPublished from "./components/published";
import PlaylistsTabs from "./components/playlistsTabs";
import MyPlaylistsDrafts from "./components/drafts";

const prepareActions = (dispatch) => ({
  fetchMyPlaylists: () => dispatch(fetchMyPlaylists()),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { fetchMyPlaylists } = prepareActions(store.dispatch);

  await fetchMyPlaylists();
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class MyPlaylistsPage extends Component {
  static propTypes = {
    fetchMyPlaylists: PropTypes.func.isRequired,
    playlists: PropTypes.object,
  };

  componentDidMount() {
    const { fetchMyPlaylists } = this.props;

    fetchMyPlaylists();
  }

  render() {
    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <PlaylistsTabs/>

        <div className=''>
          <Route exact path='/my-playlists' component={MyPlaylistsPublished}/>
          <Route path='/my-playlists/drafts' component={MyPlaylistsDrafts}/>
        </div>

      </div>
    );
  }
}

export default MyPlaylistsPage;
