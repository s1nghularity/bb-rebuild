import { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import axios from 'axios';
import { auto } from '@popperjs/core';

function AllData() {
  const [users, setUsers] = useState([{}]);
  useEffect(() => {
    axios.get('http://localhost:5000/alldata').then((res) => {
      if (Array.isArray(res.data.data)) {
        setUsers(res.data.data);
      } else {
        console.error("res.data is not an array", res.data);
      }
    });
  }, []);

  return (
    <div className="card-container">
      {users.map((user, index) => (
       
          <Card key={index} className='alldatacard' style={{ width: auto }}>
            <CardHeader style={{ width: auto }}>
              {user.id} {user.name}
            </CardHeader>
            <CardBody>
              Email: {user.email}
              <br />
              <br />
              <h6><i>Current Balance:<h4>${user.balance}</h4></i></h6>
              <br />
              <CardFooter className='card-footer'>
                Transactions:
                {user.transactionHistory ? (
                  user.transactionHistory.map((transaction, id) => (
                    <div key={id}>
                      {transaction.type} ${transaction.amount} {transaction.date}
                    </div>
                  ))
                ) : (
                  <div>No transaction history found</div>
                )}
              </CardFooter>
            </CardBody>
          </Card>
       
      ))}
    </div>
  );
  
}

export default AllData;
