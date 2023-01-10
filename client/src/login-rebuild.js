import React, { useState } from 'react';

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
          window.localStorage.setItem('loggedIn', true);
          window.location.href = '/UserDetails';
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='animated-title'>Sign In</h3>
      <div className='mb-3'>
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

      <div className='mb-3'>
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

      <div className='d-grid'>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </div>
      <p className='forgot-password text-right'>
        <a href='/createaccount'>Sign Up</a>
      </p>
    </form>
  );
};

export default Login;
