import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { userGetBookmarks } from "../../actions/user";

@connect((state) => ({
  bookmarks: state.bookmarks
}), (dispatch) => ({
  userGetBookmarks: () => dispatch(userGetBookmarks())
}))
class BookmarksBadge extends Component {
  static propTypes = {
    bookmarks: PropTypes.object,
    userGetBookmarks: PropTypes.func
  }

  componentDidMount() {
    const { userGetBookmarks } = this.props;

    userGetBookmarks();
  }

  render() {
    const { bookmarks } = this.props;

    return (        // PLEASE DELETE THIS INLINE STYLE <3
      <div style={{ border: "1px solid pink", width: "30px", textAlign: "center" }}>
        <Link to='/bookmarks'>{bookmarks.data.length}</Link>
      </div>
    );
  }
}
export default BookmarksBadge;
