import React, { Component } from "react";
import Layout from "./layout";
import queryString from "query-string";

class SearchPage extends Component {
  render() {
    const parsed = queryString.parse(this.props.location.search);

    return (
      <Layout>
        <div className='o-wrapper'>
          you searched for - {parsed.query}

          <div>
            items here...
          </div>
        </div>
      </Layout>
    );
  }
}
export default SearchPage;
