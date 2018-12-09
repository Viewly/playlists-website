import React from "react";

const PlaylistHashtags = ({ value, onChange }) => (
  <li>
    <label className='c-form__label'>Hashtags</label>
    <input
      className='c-input c-input--primary'
      type="text"
      name="hashtags"
      value={value}
      onChange={onChange} />
  </li>
);

export default PlaylistHashtags;
