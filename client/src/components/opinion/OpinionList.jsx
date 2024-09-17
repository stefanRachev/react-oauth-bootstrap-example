import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useUser } from "../../context/useUser";
import PropTypes from "prop-types";

const OpinionList = ({ opinions, onDelete, onEdit }) => {
  const { user } = useUser();
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  const handleEditClick = (opinion) => {
    setEditMode(opinion._id);
    setEditText(opinion.text);
  };

  const handleSaveClick = (id) => {
    onEdit(id, editText);
    setEditMode(null);
  };

  

  return (
    <div>
      {opinions.map((opinion) => {
        if (
          !opinion ||
          !opinion._id ||
          !opinion.text ||
          !opinion.author ||
          !opinion.author.username ||
          !opinion.createdAt
        ) {
          console.warn("Invalid opinion data:", opinion);
          return null;
        }

        return (
          <Card key={opinion._id} className="mb-3">
            <Card.Body>
              {editMode === opinion._id ? (
                <div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handleSaveClick(opinion._id)}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" onClick={() => setEditMode(null)}>
                    Cancel
                  </Button>
                </div>
              ) : (
                <div>
                  <Card.Text>{opinion.text}</Card.Text>
                  <small>
                    <strong>Author:</strong> {opinion.author.username}
                  </small>
                  <br />
                  <small>
                    <strong>Created At:</strong>{" "}
                    {new Date(opinion.createdAt).toLocaleDateString()}
                  </small>
                  {user &&
                    opinion.author &&
                    user._id === opinion.author._id.toString() && (
                      <>
                        <Button
                          variant="warning"
                          onClick={() => handleEditClick(opinion)}
                          className="me-2"
                        >
                          Редактирай
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => onDelete(opinion._id)}
                        >
                          Изтрий
                        </Button>
                      </>
                    )}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

OpinionList.propTypes = {
  opinions: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      author: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default OpinionList;
