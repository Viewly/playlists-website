import React, { Component } from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import Layout from "./layout";

import PlaylistItem from "../home/components/playlist_item";
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

  onPlaylistClick = (playlistId) => (evnt) => {
    const { history } = this.props;

    evnt.preventDefault();
    history.push(`/playlist/${playlistId}`);
  }

  render() {
    const { searchedPlaylists } = this.props;
    const isReady = isLoaded(searchedPlaylists);

    return (
      <Layout>
        <div className='o-wrapper'>
          you searched for - {this.state.query}

          {isReady && (
            <div>
              {!searchedPlaylists.data.length && (
                <div>
                  <img src={require('../../images/hero-illustration.svg')} />
                </div>
              )}

              {searchedPlaylists.data.map((item, idx) => (
                  <PlaylistItem key={`searchitem-${idx}`} onPlaylistClick={this.onPlaylistClick} {...item} />
              ))}
            </div>
          )}

          {!isReady && (
            <div>
              LOADING
            </div>
          )}
        </div>
      </Layout>
    );
  }
}
export default SearchPage;
