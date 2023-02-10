import {Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter} from 'reactstrap'
import React, {useState} from 'react'
import bank from './bank.png'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';


export default function Home(props){
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (  
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>

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

    <Button color="info" size ='sm' outline onClick={toggle} style={{ marginLeft: '20px' }}>
            Learn More
    </Button>
    <Modal isOpen={modal} toggle={toggle} {...props}>
      <ModalHeader toggle={toggle}>Capstone Project</ModalHeader>
      <ModalBody>
        This is a capstone project for a Full Stack Web Development course at the Massachusetts Institute of Technology. It uses React, Node.js, Express, and MongoDB. The project is a mock bank website that allows users to create an account, login, deposit, and withdraw money. The project also includes an unprotected mock admin page that allows anyone to view all users and their balances.
      </ModalBody>
      <ModalFooter>
        <Button  tag={Link}
                      to="/createaccount"color="primary" onClick={toggle}>
          Create Account
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>




    
</div>

    
  );  
}




