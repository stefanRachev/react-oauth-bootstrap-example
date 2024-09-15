// UserProvider.jsx
import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  // Function to refresh the token
  const refreshToken = useCallback(async () => {
    console.log("Attempting to refresh token...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/refresh-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({}),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("New access token received:", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        setToken(data.accessToken);
        return data.accessToken;
      } else {
        console.error("Refresh token failed");
        logout(); // Премахва токена и логва потребителя
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout();
      return null;
    }
  }, [token]);

  // Function to fetch user data
  const fetchUser = useCallback(async () => {
    console.log("Fetching user data with token:", token);

    if (token) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 403) {
          console.log("Token is expired or invalid, trying to refresh...");
          const newToken = await refreshToken();
          if (newToken) {
            console.log("Retrying user data fetch with new token:", newToken);
            const retryResponse = await fetch(
              `${import.meta.env.VITE_API_URL}/me`,
              {
                headers: {
                  Authorization: `Bearer ${newToken}`,
                },
              }
            );
            if (retryResponse.ok) {
              const data = await retryResponse.json();
              setUser(data.user);
            } else {
              console.error(
                "Error fetching user data after token refresh:",
                retryResponse.statusText
              );
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
    console.log("Fetching user data on mount...");
    fetchUser();
  }, [fetchUser]);

  const logout = () => {
    console.log("Logging out, removing access token...");
    localStorage.removeItem("accessToken");
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
