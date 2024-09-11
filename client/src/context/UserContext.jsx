// UserContext.jsx

import PropTypes from "prop-types";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();

          setUser(data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // Изтриване на токена от localStorage
    setUser(null); // Нулиране на потребителските данни в контекста
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
