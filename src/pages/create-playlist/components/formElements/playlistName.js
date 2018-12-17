import React from "react";

const PlaylistName = ({ value, onChange }) => (
  <li>
    <label className='c-form__label'>Playlist name</label>
    <input
      className='c-input c-input--primary'
      type="text"
      name="title"
      value={value}
      onChange={onChange}
      required/>
  </li>
);

export default PlaylistName;
