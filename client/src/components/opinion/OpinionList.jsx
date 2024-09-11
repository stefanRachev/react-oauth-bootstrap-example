import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useUser } from "../../context/useUser";
import PropTypes from "prop-types";

const OpinionList = ({ opinions, onDelete, onEdit }) => {
  const { user } = useUser();

  return (
    <div>
      {opinions.map((opinion) => (
        <Card key={opinion.id} className="mb-3">
          <Card.Body>
            <Card.Text>{opinion.text}</Card.Text>
            {user && user.id === opinion.authorId && (
              <>
                <Button
                  variant="warning"
                  onClick={() => onEdit(opinion.id)}
                  className="me-2"
                >
                  Редактирай
                </Button>
                <Button variant="danger" onClick={() => onDelete(opinion.id)}>
                  Изтрий
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

OpinionList.propTypes = {
  opinions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default OpinionList;
