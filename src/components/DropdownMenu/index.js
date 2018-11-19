import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class DropdownMenu extends Component {
  static propTypes = {
    toggle: PropTypes.node.isRequired,
    list: PropTypes.array
  }

  state = {
    isOpen: false
  }

  render() {
    const { toggle, list } = this.props;
    const { isOpen } = this.state;
    const showArrow = true;
    return (
      <div className='dd-menu'>
        <div className='dd-toggle' onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          {toggle}
          {showArrow && !isOpen && <span>v</span>}
          {showArrow && isOpen && <span>^</span>}
        </div>
        {list && isOpen && (
          <div className='dd-list'>
            {list.map((item, idx) => (
              <li className='dd-list-item' key={`dd-item-${idx}`}>
                {item.onClick
                  ? <span onClick={item.onClick}>{item.label}</span>
                  : <Link to={item.url}>{item.label}</Link>}
              </li>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default DropdownMenu;
