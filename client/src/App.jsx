import { Container, Row, Col } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />

    
      <main>
        <Container>
          <Row>
            <Col>
              <h2>Welcome to my app</h2>
              <p>This is a simple example of using Bootstrap with React.</p>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </>
  );
}

export default App;
