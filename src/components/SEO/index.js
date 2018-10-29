import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { SEO_NAME, SEO_DESCRIPTION, SEO_URL, SEO_TITLE } from "../../constants/seo_defaults";

class SEO extends Component {
  render() {
    const { playlist } = this.props;

    if (!playlist) {
      return (
        <MetaTags>
          <title>{SEO_TITLE}</title>
          <meta name="description" content={SEO_DESCRIPTION} />
          <meta property="og:title" content={SEO_NAME} />
          <meta property="og:description" content={SEO_DESCRIPTION} />
          <meta property="og:url" content={SEO_URL} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </MetaTags>
      )
    }

    return (
      <MetaTags>
        <title>{playlist.title} - {SEO_NAME}</title>
        <meta name="description" content={playlist.description} />
        <meta property="og:title" content={playlist.title} />
        <meta property="og:image" content={playlist.thumbnail} />
        <meta property="og:url" content={playlist.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </MetaTags>
    );
  }
}
export default SEO;
