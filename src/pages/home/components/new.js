import React, { Component } from "react";
import { connect } from "react-redux";
import Playlist from "../../../components/PlaylistContainer";
import { isLoaded } from "../../../utils";
// import { playlistsFetchNew } from "../../../actions/playlist";

@connect((state) => ({
  playlists: state.playlists_new,
}), (dispatch) => ({
  // playlistsFetchNew: (params) => dispatch(playlistsFetchNew(params))
  // playlistsLoadMore: (query) => dispatch(playlistsLoadMore({ query })),
}))
export default class NewPlaylists extends Component {


  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <div>
        <Playlist
          title="New playlists"
          moreButton={{ title: "View All", url: "/new" }}
          isLoaded={isReady}
          playlists={playlists?.data}
        />
      </div>
    );
  }
}
