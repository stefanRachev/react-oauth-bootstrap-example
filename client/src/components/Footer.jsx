import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; 2024 My React App</p>
            <p>
              <a href="#privacy" className="text-white">
                Privacy Policy
              </a>{" "}
              |
              <a href="#terms" className="text-white">
                Terms of Service
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
