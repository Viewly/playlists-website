import React, { Component, Fragment } from "react";
import { withRouter } from "react-router";
import queryString from "query-string";

@withRouter
class SearchInput extends Component {
  state = {
    searchText: ''
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    parsed.query && this.setState({ searchText: parsed.query });
  }

  handleEnter = (evnt) => {
    const { history } = this.props;

    if ((evnt.key === 'Enter') && (this.state.searchText.length > 0)) {
      history.push(`/search/?query=${this.state.searchText}`);
    }
  }

  render() {
    return (
      <Fragment>
        <input placeholder="Search playlists" name="" autoComplete="off" value={this.state.searchText} onChange={(e) => this.setState({ searchText: e.target.value })} onKeyUp={this.handleEnter} />
      </Fragment>
    );
  }
}
export default SearchInput;
