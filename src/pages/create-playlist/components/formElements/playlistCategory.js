import React from "react";

const PlaylistCategory = ({ value, categories, onChange }) => (
  <li>
    <label className='c-form__label'>Category</label>
    <div className='c-select u-1/1'>
      <select
        className='c-select__select'
        name="category.id"
        value={value}
        onChange={onChange}>

        <option value="0">No category</option>
        {categories.map((item, idx) => (
          <option key={`category-${idx}`} value={item.id}>{item.name}</option>
        ))}

      </select>
    </div>
  </li>
);

export default PlaylistCategory;
