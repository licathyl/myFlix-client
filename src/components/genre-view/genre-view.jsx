import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, movies, onBackClick } = this.props;

    const genreMovies = movies.filter((m) => m.Genre.Name === genre.Name);

    return (
      <Container className="m-4">
        <Card>
          <Card.Body>
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Text>{genre.Description}</Card.Text>
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
              {genreMovies.map((m, i) => (
                <Link to={`/movies/${m._id}`} className="genre-movies" key={i}>
                  {m.Title}
                </Link>
              ))}
            </Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
