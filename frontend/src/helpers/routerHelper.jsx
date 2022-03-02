async function reroute() {
  if (JSON.parse(localStorage.getItem('isLoggedIn')) === false || JSON.parse(localStorage.getItem('isLoggedIn')) === null) {
    if (/register/.test(window.location.pathname) || window.location.pathname === '/int/' || window.location.pathname === '/') {
      return null;
    }

    return '/login';
  } if (
    JSON.parse(localStorage.getItem('isLoggedIn')) === true
    && JSON.parse(localStorage.getItem('emailVerified')) === true
    && JSON.parse(localStorage.getItem('questionnaireCompleted')) === true
    && JSON.parse(localStorage.getItem('nullPointId')) !== null
  ) {
    if (/dashboard/.test(window.location.pathname)) {
      return null;
    }
    return '/dashboard';
  } if (/questionnaire/.test(window.location.pathname) && JSON.parse(localStorage.getItem('questionnaireCompleted')) === true) {
    return '/documents';
  } if (
    JSON.parse(localStorage.getItem('isLoggedIn')) === true
    && JSON.parse(localStorage.getItem('emailVerified')) === true
  ) {
    if (/documents/.test(window.location.pathname) || /questionnaire/.test(window.location.pathname)) {
      return null;
    }
    return '/documents';
  } if (
    JSON.parse(localStorage.getItem('isLoggedIn')) === true
    && JSON.parse(localStorage.getItem('emailVerified')) === false
  ) {
    if (/verify-email/.test(window.location.pathname)) {
      return null;
    }
    return '/verify-email';
  }

  return null;
}

export default { reroute };
