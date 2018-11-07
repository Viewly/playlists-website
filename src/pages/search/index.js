import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import queryString from "query-string";
import VisibilitySensor from "react-visibility-sensor";

import Layout from "./layout";

import Playlist from "../../components/PlaylistContainer";
import { isLoaded } from "../../utils";
import { playlistsFetch, playlistsLoadMore } from "../../actions";

const LIMIT = 12;

@connect((state) => ({
  playlists: state.playlists
}), (dispatch) => ({
  playlistsFetch: (query) => dispatch(playlistsFetch({ query, page: 0, limit: LIMIT })),
  playlistsLoadMore: (query, page, limit) => dispatch(playlistsLoadMore({ query, page, limit })),
}))
class SearchPage extends Component {
  state = {
    query: '',
    page: 0,
    hasMore: true
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    this.setState({ query: parsed.query });
    this.doSearch(parsed.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const parsed = queryString.parse(this.props.location.search);

      this.setState({ query: parsed.query, page: 0, hasMore: true });
      this.doSearch(parsed.query);
    }
  }

  doSearch = (query) => {
    const { playlistsFetch } = this.props;

    playlistsFetch(`title=${encodeURIComponent(query)}`);
  }

  loadMore = async (visible) => {
    const { playlistsLoadMore, match: { params: { categorySlug } } } = this.props;

    if (visible === false) {
      return;
    }

    this.setState({ page: this.state.page + 1 }, async () => {
      const playlists = await playlistsLoadMore(`title=${this.state.query}`, this.state.page, LIMIT);
      if (playlists.length < LIMIT) {
        this.setState({ hasMore: false });
      }
    })
  }

  render() {
    const { playlists } = this.props;
    const isReady = isLoaded(playlists);

    return (
      <Layout>
        <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

          {!isReady && (
            <div>
              LOADING
            </div>
          )}

          {isReady && (
            <div>
              {!playlists.data.length && (
                <div className='c-no-results'>
                  <img className='c-no-results__img' src={require('../../images/message-no-results.svg')} />
                  <p>Try searching again using different keywords, <br />or <Link to='/create-playlist'>create your playlist</Link></p>
                </div>
              )}

              {playlists.data.length > 0 && (
                <>
                  <Playlist
                    title={`Results for “${this.state.query}”`}
                    isLoaded={isReady}
                    playlists={playlists.data}
                  />

                  {this.state.hasMore && (
                    <VisibilitySensor partialVisibility offset={{ bottom: -200 }} onChange={this.loadMore}>
                      <div className='u-text-center'>
                        <button className='c-btn c-btn--secondary c-btn--small' onClick={this.loadMore}>Load more</button>
                      </div>
                    </VisibilitySensor>
                  )}
                </>
              )}

            </div>
          )}
        </div>
      </Layout>
    );
  }
}
export default SearchPage;
