import React from "react";
import ReactDOM from "react-dom";
import MainView from "./components/main-view/main-view";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

// Import statement to indicate that you need to bundle './index.scss'
import "./index.scss";

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Container>
        <Nav variant="pills" className="justify-content-end" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-1">Option 2</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2">Option 3</Nav.Link>
          </Nav.Item>
        </Nav>
        <MainView />
      </Container> 
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
