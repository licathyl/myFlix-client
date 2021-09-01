import React from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, Container } from "react-bootstrap";

export class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Cathy's Flix</Navbar.Brand>
          <Nav
            variant="pills"
            className="justify-content-end"
            defaultActiveKey="/home"
          >
            <Nav.Item>
              <Nav.Link as={Link} to={movies} className="link-text">
                All Movies
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to={profile} className="link-text">
                Profile
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
