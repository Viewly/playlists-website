import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { playlistsFetch } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query })),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch(`alias=${params.profileId}`);
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class ProfilePage extends Component {
  static propTypes = {
    playlistsFetch: PropTypes.func.isRequired,
    playlists: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
  }

  componentDidMount() {
    const { playlistsFetch, match: { params: { profileId } } } = this.props;

    playlistsFetch(`alias=${profileId}`);
  }

  render() {
    const { playlists, match: { params: { profileId } } } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title={profileId} />
        <div className='o-flag o-flag--small u-margin-bottom'>
          <div className='o-flag__img'>
            <img className='o-avatar o-avatar--large' src={require('../../images/avatar-default.jpg')}/>
          </div>
          <div className='o-flag__body'>
            <dl className='c-list-definition'>
              <dt>Johnny Sanders</dt>
              <dd>{profileId}</dd>
            </dl>
          </div>
         </div>

        <Playlist
          isLoaded={isReady}
          playlists={playlists.data.filter(i => i.user.alias === profileId)}
        />
      </div>
    );
  }
}
export default ProfilePage;
