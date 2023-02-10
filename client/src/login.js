import React, { useState } from 'react';
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: '',
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = state;
    console.log(email, password);
    fetch('http://localhost:5000/login', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, 'userRegister');
        if (data.status == 'ok') {
          alert('login successful');
          window.localStorage.setItem('token', data.data);
          window.localStorage.setItem({'userLoggedIn': true}, data.data);
          window.location.href = '/Home';
        }
      });
  };

  return (
    <div>

<Card style={{ width: '15rem', margin: 'auto', marginTop: '2rem' }}>
       
    <form onSubmit={handleSubmit}>
    <CardHeader style={{ width: '15rem' }}>
      <h3 className='animated-title'>Sign In</h3>
    </CardHeader>
      <div>
        <label>Email address</label>
        <input
          type='email'
          className='form-control'
          placeholder='Enter email'
          onChange={(e) =>
            setState({
              ...state,
              email: e.target.value,
            })
          }
        />
      </div>

      <div>
        <label>Password</label>
        <input
          type='password'
          className='form-control'
          placeholder='Enter password'
          onChange={(e) =>
            setState({
              ...state,
              password: e.target.value,
            })
          }
        />
      </div>

 
        <button type='submit' className='btn btn-primary' >
          Submit
        </button>

      <p className='forgot-password text-right'>
        <a href='/createaccount'>Sign Up</a>
      </p>
    </form>
    </Card>
    </div>

  );
};

export default Login;
