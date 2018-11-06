import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";

import Layout from "./layout";

import Playlist from "../../components/PlaylistContainer";
import { isLoaded } from "../../utils";
import { playlistSearch } from "../../actions";

@connect((state) => ({
  searchedPlaylists: state.searchedPlaylists
}), (dispatch) => ({
  playlistSearch: (query) => dispatch(playlistSearch({ query })),
}))
class SearchPage extends Component {
  state = {
    query: ''
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    this.setState({ query: parsed.query });
    this.doSearch(parsed.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search);

      this.setState({ query: parsed.query });
      this.doSearch(parsed.query);
    }
  }

  doSearch = (query) => {
    const { playlistSearch } = this.props;

    playlistSearch(query);
  }

  onPlaylistClick = (url) => (evnt) => {
    const { history } = this.props;

    evnt.preventDefault();
    history.push(`/playlist/${url}`);
  }

  render() {
    const { searchedPlaylists } = this.props;
    const isReady = isLoaded(searchedPlaylists);

    return (
      <Layout>
        <div className='o-wrapper u-padding-top-large u-padding-bottom'>

          {!isReady && (
            <div>
              LOADING
            </div>
          )}

          {isReady && (
            <div>
              {!searchedPlaylists.data.length && (
                <div className='c-no-results'>
                  <img className='c-no-results__img' src={require('../../images/no-results.svg')} />
                  <p>Try searching again using different keywords, <br />or <Link to='/create-playlist'>create your playlist</Link></p>
                </div>
              )}

              {searchedPlaylists.data.length > 0 && (
                <Playlist
                  title={`Results for “${this.state.query}”`}
                  isLoaded={isReady}
                  playlists={searchedPlaylists.data}
                />
              )}

            </div>
          )}
        </div>
      </Layout>
    );
  }
}
export default SearchPage;
