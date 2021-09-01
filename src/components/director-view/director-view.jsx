import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title>{director.Name}</Card.Title>
          <Card.Text>{director.Bio}</Card.Text>
          <Card.Text>Born: {director.Birth}</Card.Text>
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

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }),
};
