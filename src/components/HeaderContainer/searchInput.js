import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import queryString from "query-string";

@withRouter
class SearchInput extends Component {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
  }

  state = {
    searchText: ""
  }

  componentDidMount() {
    const parsed = queryString.parse(this.props.location.search);

    parsed.query && this.setState({ searchText: parsed.query });
  }

  componentDidUpdate(prevProps) {
    const thisRoute = "/search/";

    if ((prevProps.location.pathname === thisRoute) && (this.props.location.pathname !== thisRoute)) {
      this.setState({ searchText: "" });
    }
  }

  handleEnter = (evnt) => {
    evnt.key === "Enter" && this.doSearch();
  }

  doSearch = () => {
    const { history } = this.props;

    this.state.searchText.length > 0 && history.push(`/search/?query=${encodeURIComponent(this.state.searchText)}`);
  }

  render() {
    return (
      <Fragment>
        <div className='c-search-form'>
          <input className='c-search-form__input c-input c-input--primary' placeholder="Search playlists" name="" autoComplete="off" value={this.state.searchText} onChange={(e) => this.setState({ searchText: e.target.value })} onKeyUp={this.handleEnter} />
          <button type='submit' className='c-btn c-search-form__btn' onClick={this.doSearch}>
            <svg className='o-icon' width="19" height="19" viewBox="0 0 19 19" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(1 1)" stroke="#9EA0A3" strokeWidth="2" fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="7.5" cy="7.5" r="7.5"/>
                <path d="M17 17l-4.2-4.2"/>
              </g>
            </svg>

          </button>
        </div>
      </Fragment>
    );
  }
}
export default SearchInput;
