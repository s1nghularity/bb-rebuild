import { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';
import axios from 'axios';

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

  return users.map((user, index) => (
    <Card key={index} className='alldatacard' style={{ width: '35rem' }}>
      <CardHeader style={{ width: '35rem' }}>
        {user.id} {user.name}
      </CardHeader>
      <CardBody>
        Email: {user.email}
        <br />
        Balance: $ {user.balance}
        <br />
        Password: {user.password}
        <br />
        <CardFooter>
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
  ));
}

export default AllData;
