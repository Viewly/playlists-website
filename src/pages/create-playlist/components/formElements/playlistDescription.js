import React from "react";

const PlaylistDescription = ({ value, onChange }) => (
  <li>
    <label className='c-form__label'>Description</label>
    <textarea
      className='c-input c-input--primary c-input--textarea c-input--textare--resizable'
      name="description"
      value={value}
      onChange={onChange} />
  </li>
);

export default PlaylistDescription;
