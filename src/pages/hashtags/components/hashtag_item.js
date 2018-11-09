import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class HashtagItem extends Component {
  static propTypes = {
    hashtag: PropTypes.string.isRequired,
    mentions: PropTypes.string.isRequired
  }

  render() {
    const { hashtag, mentions } = this.props;

    return (
      <Link to={`/search/?query=${encodeURIComponent(hashtag)}`} className='c-category c-categories-grid__box'>
        <h3 className='c-category__title'>{hashtag}</h3>
        <span>{mentions} playlists</span>
      </Link>
    );
  }
}
export default HashtagItem;
