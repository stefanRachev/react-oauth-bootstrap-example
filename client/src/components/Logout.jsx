//Logout.jsx

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../context/useUser";

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return null;
}

export default Logout;
