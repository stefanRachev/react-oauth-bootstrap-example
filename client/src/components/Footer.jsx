import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col>
            <p>&copy; 2024 My React App</p>
            <p>
              <a href="#privacy" className={styles.link}>
                Privacy Policy
              </a>{" "}
              |
              <a href="#terms" className={styles.link}>
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
