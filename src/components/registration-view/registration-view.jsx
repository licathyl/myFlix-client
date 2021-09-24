import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birthdayError, setBirthdayError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if (isValid) {
      axios
        .post("https://cathysflix.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((e) => {
          console.log("Error registering the user");
        });
    }
  };

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdayError = {};
    let isValid = true;

    if (username.length < 5 || username === "") {
      usernameError.usernameShort = "Username must be more than 5 characters.";
      isValid = false;
    }

    if (password.length < 4 || password === "") {
      passwordError.passwordMissing =
        "Password must be at least 4 characters long.";
      isValid = false;
    }

    if (!email || email.indexOf("@") === -1) {
      emailError.notValidEmail = "Please enter a valid email address.";
      isValid = false;
    }

    if (birthday === "") {
      birthdayError.birthdayEmpty = "Please enter your birthday.";
      isValid = false;
    }

    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdayError(birthdayError);
    return isValid;
  };

  return (
    <div className="registration-wrapper">
      <h2 className="registration-header">Register for myFlix</h2>
      <Form className="registration-form" noValidate>
        <Form.Group as={Row} className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            {Object.keys(usernameError).map((key) => {
              return <div key={key}>{usernameError[key]}</div>;
            })}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Col xs="auto">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {Object.keys(passwordError).map((key) => {
              return <div key={key}>{passwordError[key]}</div>;
            })}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Col xs="auto">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            {Object.keys(emailError).map((key) => {
              return <div key={key}>{emailError[key]}</div>;
            })}
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formGroupBirthday">
          <Form.Label>Birthday</Form.Label>
          <Col xs="auto">
            <Form.Control
              type="date"
              placeholder="Birthday"
              value={birthday}
              required
              onChange={(e) => setBirthday(e.target.value)}
            />
            {Object.keys(birthdayError).map((key) => {
              return <div key={key}>{birthdayError[key]}</div>;
            })}
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Register
        </Button>
        <Button>
          <Link to="/">Login</Link>
        </Button>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
