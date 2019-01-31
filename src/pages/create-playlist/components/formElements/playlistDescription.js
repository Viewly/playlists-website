import React, { Component } from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";

import { renderToString } from "react-dom/server";

export default class PlaylistDescription extends Component {
  render() {
    const { value, isReady, onChange } = this.props;

    return (
      <li>
        <label className='c-form__label'>Description</label>
        {isReady && (
          <ReactMde
            onChange={onChange}
            value={value}
            name="description"
            generateMarkdownPreview={description => (
              Promise.resolve(renderToString(
                <ReactMarkdown source={description} linkTarget="_blank" />
              ))
            )}
          />
        )}
      </li>
    )
  }
}
