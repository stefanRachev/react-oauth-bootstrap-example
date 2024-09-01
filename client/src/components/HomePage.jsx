import { Container, Row, Col, Card, Button } from "react-bootstrap";

function HomePage() {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Row className="mb-4">
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Feature 1</Card.Title>
                  <Card.Text>
                    Discover our first feature which provides amazing benefits.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Feature 2</Card.Title>
                  <Card.Text>
                    Explore the second feature and see how it can help you.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Feature 3</Card.Title>
                  <Card.Text>
                    Find out about our third feature and its advantages.
                  </Card.Text>
                  <Button variant="primary">Learn More</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
