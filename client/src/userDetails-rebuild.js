import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserDetails() {
  const [userData, setUserData] = useState('');
  useEffect(() => {
    fetch('/userData', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userData');
        setUserData(data.data);
      });
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      Welcome<h1>{userData.name}</h1>
      You have $<h1>{userData.balance}</h1>
      <button className='btn btn-outline-primary' onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}
