import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function SignOutPage({ setUserAuthorized }) {
  const history = useHistory();

  useEffect(() => {
    const cookies = new Cookies();
    localStorage.clear();
    setUserAuthorized(false);
    cookies.remove('token', { path: '/' });
    history.push('/login');
  }, []);

  return null;
}
