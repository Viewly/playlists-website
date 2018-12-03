import React from "react";
import PropTypes from "prop-types";

const DropdownItem = ({ item, onItemClicked }) => (
  <li className='dd-list-item'>
    <span className='c-dropdown__menu__link' onClick={onItemClicked(item)}>{item.label}</span>
  </li>
);

DropdownItem.propTypes = {
  item: PropTypes.object,
  onItemClicked: PropTypes.func.isRequired,
};
export default DropdownItem;
