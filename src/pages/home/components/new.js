import React, { Component } from "react";
import { connect } from "react-redux";
import Playlist from "../../../components/PlaylistContainer";
import { isLoaded } from "../../../utils";
import VisibilitySensor from "react-visibility-sensor";
import { playlistsFetchNew } from "../../../actions/playlist";

const LIMIT = 12;

@connect((state) => ({
  playlists: state.playlists_new,
}), (dispatch) => ({
  playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params))
}))
export default class NewPlaylists extends Component {
  state = {
    page: 0,
    hasMore: true
  }

  loadMore = async (visible) => {
    const { playlistsFetchNew } = this.props;

    if (visible === false) {
      return;
    }

    this.setState({ page: this.state.page + 1 }, async () => {
      const playlists = await playlistsFetchNew({ page: this.state.page, limit: LIMIT });
      if (playlists.length < LIMIT) {
        this.setState({ hasMore: false });
      }
    });
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div>
        <Playlist
          title="New playlists"
          moreButton={{ title: "View All", url: "/new" }}
          isLoaded={isReady}
          playlists={playlists?.data.slice(0, LIMIT * (this.state.page + 1))}
        />

        {isReady && this.state.hasMore && (
          <VisibilitySensor partialVisibility offset={{ bottom: -200 }} onChange={this.loadMore}>
            <div className='u-text-center'>
              <button className='c-btn c-btn--secondary c-btn--small' onClick={this.loadMore}>Load more</button>
            </div>
          </VisibilitySensor>
        )}
      </div>
    );
  }
}
