import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import * as React from 'react'

import NavBar           from './navbar';
import Home             from './home';
import CreateAccount    from './createaccount';
import Login            from './login';
import Deposit          from './deposit';
import Withdraw         from './withdraw';
import AllData          from './alldata'
import UserDetails from './userDetails';
import { UserProvider } from "./context";


export default function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <div className="App">     
    <Router>  
      <UserProvider> 
        <NavBar />
        
          <Routes>
            <Route path = "/*"        index element = { <Home /> }          />
            <Route path = "/createaccount/" element = { <CreateAccount /> } />
            <Route path = "/login/"         element = { <Login /> }         />
            <Route path = "/deposit/"       element = { <Deposit /> }       />
            <Route path = "/withdraw/"      element = { <Withdraw /> }      />
            <Route path = "/alldata/"       element = { <AllData /> }       />
            <Route path = "/userDetails"    element = {isLoggedIn==="true"} />
          </Routes>

          <UserDetails/>
          
      </UserProvider>
    </Router>
    </div>
  );
}