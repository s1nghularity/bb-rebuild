import React, { useContext, useEffect } from 'react';
import { UserContext } from './context';
import useUserData from './useUserData';
import { Button } from 'reactstrap';

export default function UserBadge() {
  const { userData, logOut } = useUserData();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUser({
        ...user,
        balance: userData.balance
      });
    }
  }, [userData.balance]);

  useEffect(() => {
    const refresh = async () => {
      const updatedUserData = await fetch('http://localhost:5000/refreshuserbadge', { method: 'POST' });
      const newUserData = await updatedUserData.json();
      setUser({
        ...user,
        balance: newUserData.balance
      });
    };

    refresh();
  }, []);

  if (!user) {
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
      <Button size = "sm" className='btn btn-danger logout-btn' onClick={logOut}>
        Log Out
      </Button>
    </div>
  );
}
