import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter} from 'reactstrap'
import React from 'react'
import bank from './bank.png'

export default function Home(){
  return (  
    <Card style={{backgroundColor: 'rebeccapurple', color: 'whitesmoke', width: "18rem",}}>
    <img alt="Bank Company Logo" src={bank} />
    <CardBody>
      <CardTitle tag="h5">The Bad Bank</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Welcome to Bad Bank!
        </CardSubtitle>
        <CardText>
          You can move around using the navigation bar above.
        </CardText>
    </CardBody>

    </Card>
  );  
}

//How do I set the UserBadge to show on Home page if logged in?



