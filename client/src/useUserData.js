import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = () => {
  const [userData, setUserData] = useState([{}]);
  const [balance, setBalance] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('http://localhost:5000/userData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          token: window.localStorage.getItem('token'),
        }),
      });
      const data = await response.json();
      
      setUserData(data.data);
      setBalance(data.data.balance);
    };

    fetchUserData();
  }, []);

  const refetch = async () => {
    setLoading(true);
    const result = await axios (
      `http://localhost:5000/users/${userData._id || userData.id}`
    );

    setUserData(result.data);
    setBalance(result.data.balance);
    setLoading(false);
  }; 

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return { userData, balance, logOut, refetch };
};

export default useUserData;
