// refer: https://codepen.io/chrishtu/pen/WyyKRy
import React, { useState, Component } from 'react';
import '../../../styles/Dashboard/CustomPopover.scss';

class PopoverContent extends Component {
  componentDidMount() {
    if (this.node) {
      this.node.focus();
    }
    window.document.addEventListener('click', this.handleClickOutSide, false);
  }

  componentWillUnmount() {
    if (this.node) {
      this.node.blur();
    }
    window.document.removeEventListener('click', this.handleClickOutSide, false);
  }

  handleClickOutSide(e) {
    if (this.node) {
      const { closeOnClick, onClose, onClickOutSide } = this.props;
      if (closeOnClick) {
        onClose();
      } else if (!this.node.contains(e.target)) {
        onClickOutSide();
      }
    }
  }

  onKeyDown(e) {
    const { onClose } = this.props;
    if (e.keyCode === 27) {
      e.stopPropagation();
      onClose();
    }
  }

  render() {
    const {
      className, placement, showArrow, style, children,
    } = this.props;

    return (
      <div
        role="button"
        ref={(node) => { this.node = node; }}
        tabIndex="-1"
        onKeyDown={this.onKeyDown}
        className={`popover-content ${className ? ` ${className}` : ''} ${placement ? ` ${placement}` : ''} ${showArrow ? ' -arrow' : ''}`}
        style={style}
      >
        <div
          className="popover-inner"
        >
          {children}
        </div>
      </div>
    );
  }
}

const Popover = ({
  visible,
  onClickOutSide,
  showArrow,
  placement,
  closeOnClick,
  className,
  style,
  children,
  triggerNode,
  trigger,
  onChange,
}) => {
  const [show, setShow] = useState(!!visible);

  const whenChange = () => {
    if (onChange) {
      onChange(show);
    }
  };

  const onShow = (e) => {
    e.stopPropagation();
    setShow(true);
    whenChange();
  };

  const onClose = () => {
    setShow(false);
    whenChange();
  };

  const onToggle = (e) => {
    e.stopPropagation();
    setShow(!show);
    whenChange();
  };

  const handleClickOutSide = () => {
    onClose();
    if (onClickOutSide) {
      onClickOutSide();
    }
  };
  return (
    <div className="nd popover">
      {triggerNode && React.cloneElement(triggerNode, {
        onClick: trigger === 'click' || trigger === 'hover' ? onToggle : null,
        onMouseOver: trigger === 'hover' ? onShow : null,
      })}

      {show && (
        <PopoverContent
          showArrow={showArrow}
          placement={placement}
          closeOnClick={closeOnClick}
          onClickOutSide={handleClickOutSide}
          className={className}
          style={{ ...style, opacity: show ? 1 : 0 }}
          onClose={onClose}
        >
          {children}
        </PopoverContent>
      )}
    </div>
  );
};

export default Popover;
