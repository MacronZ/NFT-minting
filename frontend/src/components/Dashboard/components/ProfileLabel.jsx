import React from 'react';
import '../../../styles/Dashboard/ProfileLabel.scss';
import { useHistory } from 'react-router-dom';

function ProfileLabel({ user }) {
  const name = `${user.firstName} ${user.lastName}`;
  const firstNameInitial = `${user.firstName.charAt(0).toUpperCase()}`;
  const lastNameInitial = `${user.lastName.charAt(0).toUpperCase()}`;
  const history = useHistory();

  return (
    <div
      className="nd-profile-label"
      role="button"
      tabIndex="0"
      onClick={() => history.push('/dashboard/profile')}
      onKeyDown={() => history.push('/dashboard/profile')}
    >
      <div className="circle">
        <span className="initials">
          {firstNameInitial}
          {lastNameInitial}
        </span>
      </div>
      <div className="nd-name-section">
        <div className="nd-name rounded-none">
          <p className="nd-name-p">{name}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileLabel;
