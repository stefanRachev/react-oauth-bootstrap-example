import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>The page you are looking for does not exist.</p>
          <Link to="/">
            <Button variant="primary">Go to Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default NoPage;
