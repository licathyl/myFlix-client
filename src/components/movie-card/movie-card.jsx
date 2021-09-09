import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./movie-card.scss";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return ["Dark"].map((variant, idx) => (
      <Card
        className="mb-4"
        style={{ backgroundColor: "#141414" }}
        border="success"
        bg={variant.toLowerCase()}
        key={idx}
        text={variant.toLowerCase() === "light" ? "dark" : "white"}
      >
        <Card.Img src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="success">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    ));
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};
