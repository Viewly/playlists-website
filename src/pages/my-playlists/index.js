import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchMyPlaylists } from "../../actions/user";
import { asyncLoad } from "../../utils";

import { Route } from "react-router-dom";
import MyPlaylistsPublished from "./components/published";
import PlaylistsTabs from "./components/playlistsTabs";
import MyPlaylistsDrafts from "./components/drafts";
import SEO from "../../components/SEO";

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
    const { playlists } = this.props;

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title="My profile" />
        <div className='o-flag o-flag--small u-margin-bottom'>
          <div className='o-flag__img'>
            <img className='o-avatar o-avatar--large' src={require('../../images/avatar-default.jpg')}/>
          </div>
          <div className='o-flag__body'>
            <dl className='c-list-definition'>
              <dt>Johnny Sanders</dt>
              <dd>johnny_s</dd>
            </dl>
          </div>
         </div>

        <PlaylistsTabs playlists={playlists}/>

        <div className=''>
          <Route exact path='/my-playlists' component={MyPlaylistsPublished}/>
          <Route path='/my-playlists/drafts' component={MyPlaylistsDrafts}/>
        </div>

      </div>
    );
  }
}

export default MyPlaylistsPage;
