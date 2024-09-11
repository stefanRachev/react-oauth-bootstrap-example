import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useUser } from "../../context/useUser";
import PropTypes from "prop-types";

const InputForm = ({ onSubmit }) => {
  const [text, setText] = useState("");
  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return user ? (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="textInput">
        <Form.Label>Добави мнение:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Въведете текст тук..."
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Публикувай
      </Button>
    </Form>
  ) : (
    <p>Трябва да влезете в профила си, за да публикувате.</p>
  );
};

InputForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default InputForm;
