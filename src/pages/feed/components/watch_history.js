import React, { Component } from "react";
import { connect } from "react-redux";
import PlaylistSwiper from "../../../components/PlaylistContainer/swiper";
import { isLoading, isPending } from "../../../utils";

@connect((state) => ({
  playlists_watch_history: state.playlists_watch_history,
}))
export default class WatchHistory extends Component {
  render() {
    const { playlists_watch_history } = this.props;
    const isReady = !isPending(playlists_watch_history);

    return (
      <div>
        <PlaylistSwiper
          title="Continue watching"
          // moreButton={{ title: "View All", url: "/new" }}
          isLoaded={isReady}
          // customEmptyContainer={<Loading />}
          playlists={playlists_watch_history.data}
        />

      </div>
    );
  }
}
