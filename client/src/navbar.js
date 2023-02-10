import * as React from 'react';
import { useState } from 'react';

import {
Collapse,
NavLink,
Nav,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import UserBadge from './userbadge';

export default function NavBar() {
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

    return (
    <div>
        <Navbar color='light' light expand='lg'>
            
        <NavbarBrand tag={Link} to='/' className='navBarItem'>
            Bad Bank App
        </NavbarBrand>

        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
            <Nav className='mr-auto' navbar pills >
            <NavItem>
                <NavLink tag={Link} to='/'>
                Home
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} to='/createaccount' className='btn btn-info'>
                <Tooltip title='Begin your stable financial journey with us, Bad Bank!'>
                    <b> Create Account </b>
                </Tooltip>
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} to='/login'>
                Login
                </NavLink>
            </NavItem>

            <NavItem>
                
                <NavLink tag={Link} to='/deposit'>
                Deposit
                </NavLink>
            </NavItem>

            <NavItem>
                <NavLink tag={Link} to='/withdraw'>
                Withdraw
                </NavLink>
            </NavItem>


            <NavItem>
                <NavLink tag={Link} to='/alldata'>
                <Tooltip title='We are Bad Bank! User info is not protected.'>
                <p>All Data</p>
                </Tooltip>
                </NavLink>
            </NavItem>
            </Nav>
        </Collapse>
        <UserBadge />
        </Navbar>
    </div>
);
}
