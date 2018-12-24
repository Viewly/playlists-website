import React from "react";
import PropTypes from "prop-types";

const DropdownItem = ({ item, onItemClicked }) => (
  <li className='dd-list-item'>
    {!item.external && <span className={`c-dropdown__menu__link ${item.classNames || ''}`} onClick={onItemClicked(item)}>{item.label}</span>}
    {item.external && <a href={item.url} className={`c-dropdown__menu__link ${item.classNames || ''}`}>{item.label}</a>}
  </li>
);

DropdownItem.propTypes = {
  item: PropTypes.object,
  onItemClicked: PropTypes.func.isRequired,
};
export default DropdownItem;
