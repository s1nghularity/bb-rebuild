import React, { useEffect, useContext, useState } from 'react'
import { useUserContext, UserContext } from './context'
import useUserData from './useUserData';

import { Card, CardHeader } from 'reactstrap';
import axios from 'axios';
import deposit from './deposit.js'

function Deposit() {
  const { userData, setUserData } = useUserData();
  const { user } = useUserContext(UserContext);
  const [input, setInput] = useState('Enter deposit amount');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearError() {
    setError(false);
  }

  function clearForm() {
    setInput('Enter deposit amount');
  }

function handleChange(event) {
  const inputValue = event.target.value;
  if (isNaN(inputValue) || inputValue < 0) {
    setError('Positive numerical values only');
  } else {
    clearError(event);
    setSuccess(false);
    setInput(Number(inputValue));
  }
}

  async function handleSubmit(event) {
    event.preventDefault();

    if (!error && input > 0) {
      try {
        const response = await deposit(userData, input, setUserData, user, setError, setSuccess)
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <Card style={{ width: '35rem', margin: 'auto', marginTop: '5rem' }}>
      <CardHeader style={{ width: '35rem' }}>${userData.name}'s Account Balance: ${userData.balance}</CardHeader>
      <h2 style={{ textAlign: 'center' }}>Deposit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount</label>
          <input
            type=""
            className="form-control"
            id="amount"
            value={input}
            onChange={handleChange}
          />
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
        </div>

        <button disabled={!input} type="submit" className="btn btn-primary">
          Deposit
        </button>
      </form>
    </Card>
  );
}

export default Deposit;
