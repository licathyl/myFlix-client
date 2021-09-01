import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{genre.Name}</Card.Title>
          <Card.Text>{genre.Description}</Card.Text>
        </Card.Body>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant="primary"
        >
          Back
        </Button>
      </Card>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
