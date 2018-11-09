import React, { Component } from "react";
import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import { SEO_NAME, SEO_DESCRIPTION, SEO_URL, SEO_TITLE } from "../../constants/seo_defaults";
import { THUMBNAIL_ROOT } from "../../constants";

class SEO extends Component {
  static propTypes = {
    playlist: PropTypes.object,
    title: PropTypes.string,
  }

  render() {
    const { playlist, title } = this.props;

    if (!playlist) {
      return (
        <MetaTags>
          <title>{title ? `${title} - ${SEO_NAME}` : SEO_TITLE}</title>
          <meta name="description" content={SEO_DESCRIPTION} />
          <meta property="og:title" content={title || SEO_NAME} />
          <meta property="og:description" content={SEO_DESCRIPTION} />
          <meta property="og:url" content={SEO_URL} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
        </MetaTags>
      );
    }

    const poster = `${THUMBNAIL_ROOT}/${playlist.playlist_thumbnail_url}`;
    const description = playlist.description && playlist.description.replace(/(\r\n|\r|\n)/, "");

    return (
      <MetaTags>
        <title>{playlist.title} - {SEO_NAME}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={playlist.title} />
        <meta property="og:image" content={poster} />
        <meta property="og:url" content={playlist.url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </MetaTags>
    );
  }
}
export default SEO;
