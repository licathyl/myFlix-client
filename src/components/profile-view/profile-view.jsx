import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardGroup,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }

    axios
      .get(
        `https://cathysflix.herokuapp.com/users/${localStorage.getItem(
          "token"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log();
        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
        });
      })
      .catch((err) => console.log(err));
  }

  // Get user method
  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://cathysflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log();
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday.split("T")[0],
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Remove movie from favorites
  handleRemove() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(
        `https://cathysflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert("Movie was removed from favorites.");
        // this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Update a user's info
  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .put(
        `https://cathysflix.herokuapp.com/users/${username}`,
        {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Saved Changes");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.setState({
      Username: input,
    });
  }

  setPassword(input) {
    this.setState({
      Password: input,
    });
  }

  setEmail(input) {
    this.setState({
      Email: input,
    });
  }

  setBirthday(input) {
    this.setState({
      Birthday: input.toString(),
    });
  }

  // Delete a user
  handleDeleteUser(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(`https://cathysflix.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been deleted.");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <Container>
        <Row className="profile-view justify-content-md-center mb-4">
          <Col>
            <h2 className="section">Profile</h2>
            <Form
              noValidate
              validated={validated}
              className="update-form"
              onSubmit={(e) =>
                this.handleUpdate(
                  e,
                  this.state.Username,
                  this.state.Password,
                  this.state.Email,
                  this.state.Birthday
                )
              }
            >
              <Form.Group controlId="formBasicUsername">
                <Form.Label className="form-label">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Change Username"
                  value={this.state.Username}
                  disabled="disabled"
                  onChange={(e) => this.setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label className="form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.Password}
                  placeholder="New Password"
                  onChange={(e) => this.setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.Email}
                  placeholder="Change Email"
                  onChange={(e) => this.setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label className="form-label">Birthday</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Change Birthday"
                  value={this.state.Birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>

              <Button variant="danger" type="submit">
                Update
              </Button>
            </Form>
          </Col>

          <Col>
            <Button variant="danger" onClick={(e) => this.handleDeleteUser(e)}>
              Unregister
            </Button>
          </Col>
        </Row>

        <div className="favorites-movies mb-4">
          <h2>My Favorite Movies</h2>

          {FavoriteMovies.length === 0 && (
            <div className="text-center">Empty</div>
          )}

          <Row xs={1} md={2} lg={4}>
            {FavoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (
                  movie._id ===
                  FavoriteMovies.find((favMovie) => favMovie === movie._id)
                ) {
                  return ["Dark"].map((variant, idx) => (
                    <Col>
                      <Card
                        className="favorites-item card-content mb-4"
                        bg={variant.toLowerCase()}
                        key={idx}
                        text={
                          variant.toLowerCase() === "light" ? "dark" : "white"
                        }
                        style={{ width: "16rem" }}
                        key={movie._id}
                      >
                        <Card.Img
                          style={{ width: "16rem" }}
                          className="movieCard"
                          variant="top"
                          src={movie.ImagePath}
                        />
                        <Card.Body>
                          <Card.Title className="movie-card-title">
                            {movie.Title}
                          </Card.Title>
                          <Button
                            size="sm"
                            className="profile-button remove-favorite"
                            variant="danger"
                            value={movie._id}
                            onClick={(e) => this.handleRemove(e, movie)}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ));
                }
              })}
          </Row>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
