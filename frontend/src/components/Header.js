import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

function Header() {
    let navigate = useNavigate();
	return (
    <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} style={{cursor: "pointer"}}>ProShop</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="ms-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                    <Nav.Link onClick={() => navigate("/cart")}><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                    <Nav.Link onClick={() => navigate("/login")}><i className="fas fa-user"></i> Sign In</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    );
}

export default Header;
