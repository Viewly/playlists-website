import React, { Component } from "react";
import MetaTags from "react-meta-tags";
import { SEO_NAME, SEO_DESCRIPTION, SEO_URL, SEO_TITLE } from "../../constants/seo_defaults";

class SEO extends Component {
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
      )
    }
    // TODO - url from constants or env
    const poster = `https://s3.eu-central-1.amazonaws.com/viewly-playlists-eu1/upload/${playlist.playlist_thumbnail_url}`;
    const description = playlist.description.replace(/(\r\n|\r|\n)/, '');
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
