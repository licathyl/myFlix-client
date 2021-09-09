import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, movies, onBackClick } = this.props;

    const directorsMovies = movies.filter(
      (m) => m.Director.Name === director.Name
    );

    return ["Dark"].map((variant, idx) => (
      <Card
        className="mb-4"
        border="success"
        bg={variant.toLowerCase()}
        key={idx}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
      >
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>Born: {director.Birth}</Card.Text>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
            variant="primary"
          >
            Back
          </Button>
        </Card.Body>
        <Card.Body>
          <Card.Title>Related Movies</Card.Title>
          <Row>
            {directorsMovies.map((m, i) => (
              <Link
                to={`/movies/${m._id}`}
                className="directors-movies"
                key={i}
              >
                {m.Title}
              </Link>
            ))}
          </Row>
        </Card.Body>
      </Card>
    ));
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
};
