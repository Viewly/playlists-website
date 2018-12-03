import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import DropdownItem from "./item";
import onClickOutside from "react-onclickoutside";

@withRouter
@onClickOutside
class DropdownMenu extends Component {
  static propTypes = {
    toggle: PropTypes.node.isRequired,
    list: PropTypes.array,
    history: PropTypes.object
  }

  state = {
    isOpen: false
  }

  handleClickOutside = (evt) => {
    this.setState({ isOpen: false });
  }

  onClick = (item) => (evnt) => {
    const { history } = this.props;

    item.onClick ? item.onClick() : history.push(item.url);
    this.setState({ isOpen: false });
  }

  render() {
    const { toggle, list } = this.props;
    const { isOpen } = this.state;
    const showArrow = true;
    return (
      <div className='c-dropdown dd-menu'>
        <div className='c-dropdown__toggle c-dropdown__toggle--with-arrow  dd-toggle' onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
          {toggle}
        </div>
        {list && isOpen && (
          <div className='c-dropdown__menu'>
            <ul className='dd-list'>
              {list.map((item, idx) => (
                <DropdownItem key={`dd-item-${idx}`} onItemClicked={this.onClick} item={item} />
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}
export default DropdownMenu;
