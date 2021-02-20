import React from 'react';
import { Container, Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {

    return (
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">Ad-Hawk</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">About</Nav.Link>
                <Nav.Link href="#pricing">Contact</Nav.Link>
            </Nav>
        </Container>
    </Navbar>
    )
}

export default Header;