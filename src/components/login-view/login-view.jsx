import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios
      .post("https://cathysflix.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert("Incorrect email or password");
      });
  };

  return (
    <div className="login-wrapper">
      <h2 className="login-header">Login to myFlix</h2>
      <div className="login-form">
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Col xs="auto">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Button variant="success" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <br />
          <br />
          <h3>Don't have an account?</h3>
          <br />
          <Link to="/register">
            <Button variant="success">Create an account</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
