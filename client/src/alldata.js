import { useContext, useState } from "react";
import { useUserContext, UserContext, UserProvider } from "./context";
import { Card, CardBody, CardFooter, CardHeader} from "reactstrap";
import * as React from 'react'

function AllData() {
  return (
    <div>
      <UserAccountData />
    </div>
  );
}

function UserAccountData() {
  const { user, setUser, userLoggedIn, setUserLoggedIn } = useUserContext();
  const context = useContext(UserContext);
  const [total, setTotal] = useState(context.user[1].balance);
  const [transactions, setTransactions] = useState(context.user[1].transactionHistory);

  return (

    <div>
    <h3> All User Account Data </h3>
      <br/>
        {user.map((user, index) => (
            <>
            <Card key={index} className = "alldatacard" style={{ width: '35rem' }}>
            <CardHeader style={{ width: '35rem' }}>
            {user.id} {user.name}
            </CardHeader>
            <CardBody>      
            Email:      {user.email}
            <br/>
            Balance: $  {user.balance}
            <br/>
            Password:   {user.password}
            <br/>
            
            <CardFooter>
            Transactions: {user.transactionHistory.map((transaction, id) => (
              <div key={id}>
              {transaction.type} ${transaction.amount} {transaction.date}
              </div>
            ))}
            </CardFooter>
            </CardBody>
                        
            </Card>
            <br/>
          
            </>        
        ))}
      <br/>
    </div>

    
  
  );
}

export default AllData;
