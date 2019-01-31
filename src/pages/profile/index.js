import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { playlistsFetch } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import SEO from "../../components/SEO";
import { fetchUserProfile } from "../../actions/user";

const prepareActions = (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query })),
  fetchUserProfile: (alias) => dispatch(fetchUserProfile({ alias })),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch, fetchUserProfile } = prepareActions(store.dispatch);

  await fetchUserProfile(params.profileId);
  await playlistsFetch(`alias=${params.profileId}`);
})
@connect((state) => ({
  playlists: state.playlists,
  user_profile: state.user_profile,
  user: state.user
}), prepareActions)
class ProfilePage extends Component {
  static propTypes = {
    playlistsFetch: PropTypes.func.isRequired,
    playlists: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
  }

  componentDidMount() {
    const { fetchUserProfile, playlistsFetch, match: { params: { profileId } } } = this.props;

    fetchUserProfile(profileId);
    playlistsFetch(`alias=${profileId}`);
  }

  render() {
    const { playlists, user_profile, user, match: { params: { profileId } } } = this.props;
    const isReady = isLoaded(playlists);

    if (user?.alias === profileId) {
      return <Redirect to="/my-profile" />;
    }

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>
        <SEO title={profileId} />

        {isLoaded(user_profile) && (
          <div className='o-flag o-flag--small u-margin-bottom'>
            <div className='o-flag__img'>
              {!user_profile.avatar_url && <img className='o-avatar o-avatar--large' src={require('../../images/avatar-default.jpg')} />}
              {user_profile.avatar_url && <img className='o-avatar o-avatar--large' src={user_profile.avatar_url} />}
            </div>
            <div className='o-flag__body'>
              <dl className='c-list-definition'>
                <dt>{user_profile.first_name} {user_profile.last_name}</dt>
                <dd>{user_profile.alias}</dd>
              </dl>
            </div>
          </div>
        )}

        <Playlist
          isLoaded={isReady}
          playlists={playlists.data.filter(i => i.user.alias === profileId)}
        />
      </div>
    );
  }
}

export default ProfilePage;
