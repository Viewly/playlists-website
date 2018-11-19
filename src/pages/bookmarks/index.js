import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { SET_SERVER_RENDERED, SET_CLIENT_RENDERED } from "../../actions";
import { userGetBookmarks } from "../../actions/user";
import { isLoaded, asyncLoad } from "../../utils";

import Playlist from "../../components/PlaylistContainer";
import { BOOKMARKS_PAGE } from "../../constants/pages";

const prepareActions = (dispatch) => ({
  userGetBookmarks: () => dispatch(userGetBookmarks()),
  setServerRendered: () => dispatch({ type: SET_SERVER_RENDERED, data: BOOKMARKS_PAGE }),
  setClientRendered: () => dispatch({ type: SET_CLIENT_RENDERED, data: BOOKMARKS_PAGE }),
});

@asyncLoad(async (params = {}, query = {}, store) => {
  const { userGetBookmarks, setServerRendered } = prepareActions(store.dispatch);

  await userGetBookmarks();
  setServerRendered();
})
@connect((state) => ({
  bookmarks: state.bookmarks,
  isSSR: !!state.renderedPages[BOOKMARKS_PAGE]
}), prepareActions)
class BookmarksPage extends Component {
  static propTypes = {
    userGetBookmarks: PropTypes.func.isRequired,
    setClientRendered: PropTypes.func.isRequired,
    isSSR: PropTypes.bool,
    bookmarks: PropTypes.object,
  }

  componentDidMount() {
    const { userGetBookmarks, setClientRendered, isSSR } = this.props;

    if (!isSSR) {
      userGetBookmarks();
    } else {
      setClientRendered();
    }
  }

  render() {
    const { bookmarks } = this.props;
    const isReady = isLoaded(bookmarks);

    return (
      <div className='o-wrapper u-padding-top-large u-padding-top-huge@large u-padding-bottom'>

        <Playlist
          title="Bookmarks"
          isLoaded={isReady}
          playlists={bookmarks.data}
        />
      </div>
    );
  }
}
export default BookmarksPage;
