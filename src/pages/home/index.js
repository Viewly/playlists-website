import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./layout";

import { playlistsFetch } from "../../actions";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "./components/playlist";
import Recommended from "./components/recommended";


const prepareActions = (dispatch) => ({
  playlistsFetch: () => dispatch(playlistsFetch())
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { playlistsFetch } = prepareActions(store.dispatch);

  await playlistsFetch();
})
@connect((state) => ({
  playlists: state.playlists
}), prepareActions)
class HomePage extends Component {
  constructor(props) {
    super(props);

    // console.log('props staticContext', props.staticContext)
  }

  componentDidMount() {
    const { playlistsFetch } = this.props;

    playlistsFetch();
  }

  loadData() {
    return 'lol';
  }

  onPlaylistClick = (playlistId) => (evnt) => {
    const { history } = this.props;

    evnt.preventDefault();
    history.push(`/playlist/${playlistId}`);
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <Layout>
        {isReady && (
          <div className='o-wrapper'>
            <Recommended isLoaded={true} data={playlists.data.filter(i => i.classification === 'staff_picked').sort(() => .5 - Math.random()).splice(0, 3)} onPlaylistClick={this.onPlaylistClick} />
            <Playlist isLoaded={true} data={playlists.data} onPlaylistClick={this.onPlaylistClick} />
          </div>
        )}
      </Layout>
    );
  }
}
export default HomePage;
