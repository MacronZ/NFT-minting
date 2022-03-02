import React, { useEffect, useState } from 'react';
import './styles/styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import Switch from './components/Switch';
import { userController } from './controllers';
import './styles/Dashboard/Widgets.scss';

const ThemeChanger = () => {
  const appTheme = useSelector((state) => state.theme);
  const [uuid, setUserUuid] = useState('');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  function changeThemeOnRedux(theme) {
    dispatch({
      type: 'CHANGE_THEME',
      theme,
    });
  }

  useEffect(async () => {
    const user = await JSON.parse(localStorage.getItem('user'));
    setUserUuid(user.uuid);
    changeThemeOnRedux(user.theme);
    if (user.theme === 'dark') document.body.classList.add('dark-mode');
  }, []);

  const updateThemeOnDb = async (theme) => {
    try {
      if (uuid) await userController.updateUser(uuid, { theme });
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  };

  const handleChange = () => {
    if (appTheme === 'light') {
      changeThemeOnRedux('dark');
      updateThemeOnDb('dark');
      document.body.classList.add('dark-mode');
    } else {
      changeThemeOnRedux('light');
      updateThemeOnDb('light');
      document.body.classList.remove('dark-mode');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Switch isDarkModeOn={appTheme === 'dark'} handleChange={handleChange} />
      <span style={{
        color: 'white',
        fontSize: '12px',
        fontWeight: 600,
        padding: '1px 8px',
        backgroundColor: 'red',
        borderRadius: '5px',
        letterSpacing: '0.5px',
        position: 'absolute',
        right: '-30px',
        top: '-10px',
      }}
      >
        new
      </span>
    </div>
  );
};

export default ThemeChanger;
