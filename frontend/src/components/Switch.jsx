import React from 'react';
import '../styles/components/Switch.scss';
import { useSelector } from 'react-redux';
import lightMode from '../media/images/icons/lightMode.svg';
import darkMode from '../media/images/icons/darkMode.svg';

const Switch = ({ isDarkModeOn, handleChange }) => {
  const setToggleIcon = () => {
    const getTheme = useSelector((state) => state.theme);

    if (getTheme === 'dark') {
      return (
        <img src={darkMode} style={{ margin: '-2px' }} width={20} alt="Logo" />
      );
    }
    return (
      <img src={lightMode} style={{ paddingLeft: '2px', paddingBottom: '1px' }} width={13} alt="Logo" />
    );
  };

  return (

    <div className="toggle-switch small-switch">
      <input
        type="checkbox"
        checked={isDarkModeOn}
        onChange={handleChange}
        className="toggle-switch-checkbox"
        name="toggleSwitch"
        id="theme-switch"
      />
      <label
        className="toggle-switch-label"
        htmlFor="theme-switch"
      >
        <span className="toggle-switch-inner" />
        <div className="toggle-switch-switch">
          {setToggleIcon()}
        </div>
      </label>
    </div>
  );
};

export default Switch;
