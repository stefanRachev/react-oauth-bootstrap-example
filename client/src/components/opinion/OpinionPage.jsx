import { useState, useEffect } from "react";
import InputForm from "./InputForm ";
import OpinionList from "./OpinionList";
import { useUser } from "../../context/useUser";

function OpinionPage() {
  const [opinions, setOpinions] = useState([]);
  const { refreshToken, fetchUser, token } = useUser();

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/opinions`
        );
        const data = await response.json();
        setOpinions(data);
      } catch (error) {
        console.error("Error fetching opinions:", error);
      }
    };
    fetchOpinions();
  }, []);

  const handleAddOpinion = async (text) => {
    try {
      let accessToken = token;
      if (!accessToken) {
        accessToken = await refreshToken();

        await fetchUser(accessToken);
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/opinions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to add opinion");
      }

      const newOpinion = await response.json();
      setOpinions([...opinions, newOpinion]);
    } catch (error) {
      console.error("Error adding opinion:", error);
    }
  };

  const handleDeleteOpinion = async (id) => {
    try {
      let accessToken = token;
      if (!accessToken) {
        accessToken = await refreshToken();
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/opinions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setOpinions(opinions.filter((opinion) => opinion._id !== id));
      } else {
        console.error("Error deleting opinion:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting opinion:", error);
    }
  };

  const handleEditOpinion = async (id, newText) => {
    try {
      let accessToken = token;
      if (!accessToken) {
        accessToken = await refreshToken();
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/opinions/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: newText }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Error updating opinion:", error);
      } else {
        const updatedOpinion = await response.json();
        setOpinions(
          opinions.map((opinion) =>
            opinion._id === id ? updatedOpinion : opinion
          )
        );
      }
    } catch (error) {
      console.error("Error updating opinion:", error);
    }
  };

  return (
    <div>
      <InputForm onSubmit={handleAddOpinion} />
      <OpinionList
        opinions={opinions}
        onDelete={handleDeleteOpinion}
        onEdit={handleEditOpinion}
      />
    </div>
  );
}

export default OpinionPage;
