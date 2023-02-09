import React, { useContext } from 'react';
import { UserContext } from './context';
import useUserData from './useUserData';

export default function UserBadge() {
  const { userData, logOut } = useUserData();
  
  if (!userData) {
    return null;
  }

  return (
    <div className='user-badge'>
      <p className='welcome-message'>
        Welcome, <strong>{userData.name}</strong>
      </p>
      <p className='balance'>
        Balance: $<strong>{userData.balance}</strong>
      </p>
      <button className='btn btn-outline-primary logout-btn' onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}
