import React from "react";
import PropTypes from "prop-types";

const DropdownItem = ({ item, onItemClicked }) => (
  <li className='dd-list-item' onClick={onItemClicked(item)}>
    <span>{item.label}</span>
  </li>
);

DropdownItem.propTypes = {
  item: PropTypes.object,
  onItemClicked: PropTypes.func.isRequired,
};
export default DropdownItem;
