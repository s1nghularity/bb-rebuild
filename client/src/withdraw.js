import React, { useState } from 'react'
import { useUserContext, UserContext } from './context'
import useUserData from './useUserData';
import { Card, CardHeader } from 'reactstrap';
import axios from 'axios';

function Withdraw() {
  const { userData } = useUserData();
  const { user } = useUserContext(UserContext);
  const [amount, setAmount] = useState();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  function clearError() {
    setError(false);
  }

  function handleChange(event) {
    const amount = event.target.value;
    if (isNaN(amount) || amount < 0) {
      setError('Positive numerical values only');
    } else {
      clearError();
      setAmount(Number(amount));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newTotal = userData.balance - Number(amount);
    if (newTotal < 0) {
      setError('Insufficient funds');
      return;
    }

    const newTransaction = { type: 'withdrawal', amount: Number(amount), date: new Date() };

    axios
      .put(`http://localhost:5000/withdraw/${userData._id || userData.id}`, {
        userData: {
          withdrawAmount: amount,
          balance: newTotal,
          transactionHistory: [...userData.transactionHistory, newTransaction],
        },
      })
      .then(async (res) => {
        console.log(res.data);
        setSuccess('Withdrawal successful');
        await useUserData.refetch();
      })
      .catch((err) => console.error(err));
  };
        


  
  return (
    <UserContext.Provider value={{ user }}>
      <Card style={{ width: '35rem', margin: 'auto', marginTop: '5rem' }}>
        <CardHeader style={{ width: '35rem' }}>
          ${userData.name}'s Account Balance: ${userData.balance}
        </CardHeader>
        <h2 style={{ textAlign: 'center' }}>Withdraw</h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Amount</label>
            <input
              id='amount'
              className='form-control'
              type= 'number'             
              value= {amount}
              onChange={handleChange}
            />
            {error && <div className='alert-danger'>{error}</div>}
            {success && <div className='alert alert-success'>{success}</div>}
          </div>

          <button disabled={!amount} type='submit' className='btn btn-primary'>
            Withdraw
          </button>
        </form>
      </Card>
    </UserContext.Provider>
  );
}

export default Withdraw;
