//Logout.jsx

// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function Logout() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     localStorage.removeItem("token");

//     navigate("/login");
//   }, [navigate]);

//   return null;
// }

// export default Logout;

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/useUser"; // Импортирай контекста

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser(); // Извикай функцията за разлогване от контекста

  useEffect(() => {
    logout(); // Нулира потребителските данни и премахва токена
    navigate("/login");
  }, [logout, navigate]);

  return null;
}

export default Logout;
