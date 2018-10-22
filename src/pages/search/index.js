import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
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
                  <p>Try searching again using different keywords, <br />or <Link to='/new'>create your playlist</Link></p>
                </div>
              )}

              {searchedPlaylists.data.length > 0 && (
                <div>
                  <h2 className='u-h4'>Results for &ldquo;{this.state.query}&rdquo;</h2>

                  <div className='o-grid'>
                    {searchedPlaylists.data.map((item, idx) => (
                      <PlaylistItem key={`searchitem-${idx}`} onPlaylistClick={this.onPlaylistClick} {...item} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </Layout>
    );
  }
}
export default SearchPage;
