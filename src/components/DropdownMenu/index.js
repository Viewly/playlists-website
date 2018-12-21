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
    showArrow: PropTypes.bool,
    wide: PropTypes.bool,
    list: PropTypes.array,
    emptyList: PropTypes.node,
    dropdownFooter: PropTypes.node,
    onToggleClick: PropTypes.func,
    history: PropTypes.object
  };

  static defaultProps = {
    showArrow: true,
    wide: false,
    emptyList: null,
    dropdownFooter: null
  };

  state = {
    isOpen: false
  };

  handleClickOutside = (evt) => {
    this.setState({ isOpen: false });
  };

  onClick = (item = {}) => () => {
    const { history } = this.props;

    item.onClick ? item.onClick() : history.push(item.url);
    this.setState({ isOpen: false });
  };

  render() {
    const { toggle, list, showArrow, wide, emptyList, dropdownFooter, onToggleClick } = this.props;
    const { isOpen } = this.state;

    return (
      <div className='c-dropdown dd-menu'>
        <div
          className={`c-dropdown__toggle dd-toggle ${showArrow ? "c-dropdown__toggle--with-arrow " : ""}`}
          onClick={() => {
            if (onToggleClick) {
              onToggleClick() && this.setState({ isOpen: !this.state.isOpen });
            } else {
              this.setState({ isOpen: !this.state.isOpen });
            }
          }}>
          {toggle}
        </div>
        {list && isOpen && (
          <div className={`c-dropdown__menu ${wide ? "c-dropdown__menu--wide" : ""}`}>
            <ul className='dd-list'>
              {list.map((item, idx) => {
                return (
                  React.isValidElement(item)
                    ? <item.type key={`dd-item-${idx}`} {...item.props} onClick={this.onClick(item.props)} />
                    : <DropdownItem key={`dd-item-${idx}`} onItemClicked={this.onClick} item={item}/>
                );
              })}
              {list.length === 0 && emptyList && emptyList}
            </ul>
            {dropdownFooter && (
              <div className='dd-footer' onClick={this.onClick()}>
                {dropdownFooter}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default DropdownMenu;
