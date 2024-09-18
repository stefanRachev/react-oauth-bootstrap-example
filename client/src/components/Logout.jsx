 //Logout.jsx

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
// import { useUser } from "../context/useUser";

// function Logout() {
//   const navigate = useNavigate();
//   const { logout } = useUser();

//   useEffect(() => {
//     logout();
//     navigate("/login");
//   }, [logout, navigate]);

//   return null;
// }

// export default Logout;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/useUser";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Извикваме сървърния ендпойнт за логаут
        const response = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (response.ok) {
          // Извикваме локалната функция за логаут
          logout();
          navigate("/login");
        } else {
          console.error("Logout failed");
          // Може би искаш да уведомиш потребителя за грешка
        }
      } catch (error) {
        console.error("Error during logout:", error);
        // Може би искаш да уведомиш потребителя за грешка
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
}

export default Logout;
