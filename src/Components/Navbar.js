import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCountAll } from '../redux/slices/cartSlice';

function NavbarComponent() {
  const CartNumber = useSelector(selectCountAll);
  return (
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand to="/products">MyStore</Navbar.Brand>
          <Nav className="me-auto">

            
            <Nav.Link as={NavLink} to="/products/list " style={({isActive})=>({textDecoration: isActive && 'underline'})}>Products</Nav.Link>
            <Nav.Link as={NavLink} to="/products/add" style={({isActive})=>({textDecoration:isActive && 'underline'})}>Add New Product</Nav.Link>
            <Nav.Link as={NavLink} to="/cart" style={({isActive})=>({textDecoration:isActive && 'underline'})}>Panier ({CartNumber})</Nav.Link>

          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavbarComponent