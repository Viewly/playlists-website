import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { playlistAddComment, playlistCommentsFetch } from "../../../actions/playlist";
import { isLoaded } from "../../../utils";
import Loading from "../../../components/loading";
import { set } from "lodash";

@connect((state) => ({
  playlist: state.playlist,
  comments: state.comments,
  user: state.user
}), (dispatch) => ({
  playlistCommentsFetch: (playlist_id) => dispatch(playlistCommentsFetch({ playlist_id })),
  playlistAddComment: (playlist_id, description) => dispatch(playlistAddComment({ playlist_id, description }))
}))
export default class PlaylistComments extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    match: PropTypes.object
  };

  state = {
    comment: ""
  }

  componentDidMount() {
    const { playlistCommentsFetch, playlist } = this.props;

    playlistCommentsFetch(playlist.id);
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;
    this.setState({ [field]: evnt.target.value });
  };

  submitComment = async () => {
    const { playlistCommentsFetch, playlistAddComment, playlist } = this.props;

    await playlistAddComment(playlist.id, this.state.comment);
    this.setState({ comment: "" });
    playlistCommentsFetch(playlist.id);
  }

  render() {
    const { playlist, comments } = this.props;
    const isReady = comments.playlist_id === playlist.id && isLoaded(comments);

    return (
      <div className='u-3/4@medium u-3/5@large u-1/2@extralarge'>
        <div>
          <textarea
            className='c-input c-input--primary c-input--inversed c-input--textarea u-margin-bottom'
            name="comment"
            placeholder="Write a comment"
            value={this.state.comment}
            onChange={this.handleChange} />

            <div className='u-text-right'>
              <button type="submit" className="c-btn c-btn--secondary" onClick={this.submitComment}>Comment</button>
            </div>
        </div>

        <div className='u-margin-top-large'>
          {!isReady && <Loading />}
          {isReady && comments.data.map(item => (
            <div key={`comment-${item.id}`}>
              <span>{item.user?.alias}</span>
              :
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
