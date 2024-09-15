
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useUser } from "../context/useUser";
import { Link } from "react-router-dom";

function Navigation() {
  const { user } = useUser();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => document.querySelector('.navbar-toggler').click()}>
              Home
            </Nav.Link>
            {user ? (
              <>
                <Nav.Link as={Link} to="/logout" onClick={() => document.querySelector('.navbar-toggler').click()}>
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/protectedAccordion" onClick={() => document.querySelector('.navbar-toggler').click()}>
                  Protected Accordion
                </Nav.Link>
                <Nav.Link as={Link} to="/opinion" onClick={() => document.querySelector('.navbar-toggler').click()}>
                  Opinion Page
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/register" onClick={() => document.querySelector('.navbar-toggler').click()}>
                  Register
                </Nav.Link>
                <Nav.Link as={Link} to="/login" onClick={() => document.querySelector('.navbar-toggler').click()}>
                  Login
                </Nav.Link>
              </>
            )}
            <NavDropdown
              className="d-lg-none"
              title="Dropdown"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
