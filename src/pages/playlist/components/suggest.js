import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

@connect((state) => ({
  playlist: state.playlist
}))
export default class PlaylistInfo extends Component {
  state = {
    link: '',
    description: '',
    email: ''
  }

  handleChange = (evnt) => {
    const field = evnt.target.name;

    this.setState({ [field]: evnt.target.value });
  }

  handleSubmit(evnt) {
    alert('FORM SUBMIT YAY');
    evnt.preventDefault();
  }

  render() {
    const { playlist } = this.props;
    const isLoaded = playlist._status === 'LOADED';

    if (!isLoaded) return <div>Loading ...</div>;

    return (
      <div className='o-wrapper'>
        <div>
          <Link to={`/playlist/${playlist.id}`}>Back</Link>
        </div>

        <div>
          <h2>Suggest video</h2>

          <form onSubmit={this.handleSubmit}>

            <div>
              <label>Link to video</label>
              <input type="text" name="link" placeholder="Your video link" value={this.state.link} onChange={this.handleChange} />
            </div>
            <div>
              <label>Description</label>
              <input type="text" name="description" placeholder="Short description" value={this.state.description} onChange={this.handleChange} />
            </div>
            <div>
              <label>Email address</label>
              <input type="text" name="email" placeholder="Your email" value={this.state.email} onChange={this.handleChange} />
            </div>

            <button>Submit</button>

          </form>
        </div>
      </div>
    );
  }
}
