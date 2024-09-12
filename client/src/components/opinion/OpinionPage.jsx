import { useState, useEffect } from "react";
import InputForm from "./InputForm ";
import OpinionList from "./OpinionList";

function OpinionPage() {
  const [opinions, setOpinions] = useState([]);

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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/opinions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const newOpinion = await response.json();
      setOpinions([...opinions, newOpinion]);
    } catch (error) {
      console.error("Error adding opinion:", error);
    }
  };

  const handleDeleteOpinion = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/opinions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setOpinions(opinions.filter((opinion) => opinion.id !== id));
    } catch (error) {
      console.error("Error deleting opinion:", error);
    }
  };

  return (
    <div>
      <InputForm onSubmit={handleAddOpinion} />
      <OpinionList
        opinions={opinions}
        onDelete={handleDeleteOpinion}
      />
    </div>
  );
}

export default OpinionPage;

