import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  // Function to refresh the token
  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accessToken: localStorage.getItem("accessToken"),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        setToken(data.accessToken);
        return data.accessToken;
      } else {
        console.error("Refresh token failed");
        logout();
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  }, []);

  // Function to fetch user data
  const fetchUser = useCallback(async () => {
    console.log(token);
    
    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
              console.log(response.status);
              
        if (response.status === 401) {
          // Token is expired or invalid, try to refresh it
          const newToken = await refreshToken();
          if (newToken) {
            // Retry fetching user data with the new token
            const retryResponse = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUser(data.user);
            }
          }
        } else if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }, [token, refreshToken]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const logout = () => {
    localStorage.removeItem("accessToken");
    //localStorage.removeItem("refreshToken");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, refreshToken }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
