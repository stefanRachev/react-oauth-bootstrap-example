import Accordion from "react-bootstrap/Accordion";
import { useUser } from "../context/useUser";

function ProtectedAccordion() {
  const { user } = useUser();

  return user ? (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Section 1</Accordion.Header>
        <Accordion.Body>Content for section 1.</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Section 2</Accordion.Header>
        <Accordion.Body>Content for section 2.</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  ) : null;
}

export default ProtectedAccordion;
