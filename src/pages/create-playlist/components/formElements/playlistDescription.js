import React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";

import { renderToString } from "react-dom/server";

const PlaylistDescription = ({ value, onChange }) => (
  <li>
    <label className='c-form__label'>Description</label>
    {value && (
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
);

export default PlaylistDescription;
