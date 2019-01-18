import React, { Component } from "react";

export default class PlaylistVideoPreview extends Component {
  state = {
    title: ""
  };

  componentDidMount() {
    const { title } = this.props;
    this.setState({ title });
  }

  componentDidUpdate(prevProps) {
    const { title } = this.props;

    if (prevProps.title !== title) {
      this.setState({ title });
    }
  }

  updateTitle = () => {
    const { id, title, onUpdateTitle } = this.props;

    if (this.state.title !== title) {
      onUpdateTitle(id, this.state.title);
    }
  }

  render() {
    const { id, thumbnail_url, onDelete } = this.props;

    return (
      <div className='c-video-link-preview'>
        <div className='o-grid o-grid--auto o-grid--nowrap o-grid--middle o-grid--small'>

          <div className='o-grid__cell'>
            <img
              className='o-icon o-icon--small'
              src={require("../../../../images/icons/reorder.svg")}/>
          </div>
          <div className='o-grid__cell o-grid__cell--grow'>
            <div className='o-grid o-grid--small o-grid--auto o-grid--nowrap o-grid--middle'>
              <div className='o-grid__cell u-1/3'>
                <span className='o-ratio o-ratio--16:9'>
                  <img className='c-video-link-preview__thumbnail o-ratio__content' src={thumbnail_url}/>
                </span>
              </div>
              <div className='o-grid__cell u-2/3'>
                <input
                  className='c-input c-input--primary c-input--small'
                  type="text"
                  name="title"
                  value={this.state.title}
                  onBlur={this.updateTitle}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  onChange={(e) => this.setState({ title: e.target.value })}/>
              </div>
            </div>
          </div>
          <div className='o-grid__cell'>
            <div className='c-faux-link'>
              <img
                onClick={onDelete(id)}
                className='o-icon o-icon--small'
                src={require("../../../../images/icons/delete-2.svg")}/>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
