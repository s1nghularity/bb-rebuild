import { useState, useEffect } from 'react';

const useUserData = () => {
  const [userData, setUserData] = useState([{}]);

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
    };

    fetchUserData();
  }, []);

  const logOut = () => {
    window.localStorage.removeItem('token');
    window.location.reload();
  };

  return { userData, logOut };
};

export default useUserData;
