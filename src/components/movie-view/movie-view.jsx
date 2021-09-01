import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import "./movie-view.scss";

export class MovieView extends React.Component {
  handleAdd() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://cathysflix.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Added to Favorites List");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <p>
            Genre:&nbsp;
            <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
          </p>
          <p>
            Director:&nbsp;
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </p>
          <Button
            variant="danger"
            className="fav-button"
            value={movie._id}
            onClick={(e) => this.handleAdd(e, movie)}
          >
            Add to Favorites
          </Button>
          <Button
            onClick={() => {
              onBackClick(null);
            }}
            variant="primary"
          >
            Back
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  // onMovieClick: PropTypes.func.isRequired
};
