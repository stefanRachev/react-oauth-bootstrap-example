//UserContext.jsx

import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [tokenIssuedTime, setTokenIssuedTime] = useState(
    localStorage.getItem("tokenIssuedTime") || Date.now()
  );
  const tokenLifetime = 60 * 1000; // 1 минута (60000ms)

  // Функция за обновяване на токена
  const refreshToken = useCallback(async () => {
    if (!token) return; // Ако няма токен, не се опитвай да рефрешваш

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
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("New access token received:", data.accessToken);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenIssuedTime", Date.now());
        setToken(data.accessToken);
        setTokenIssuedTime(Date.now());
        // Извличаме потребителските данни след рефреш на токена
        await fetchUser(data.accessToken);
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

  // Функция за автоматично рефрешване на токена преди да изтече
  const startTokenRefreshTimer = useCallback(() => {
    if (tokenIssuedTime) {
      const timeSinceIssue = Date.now() - tokenIssuedTime;
      const timeUntilExpire = tokenLifetime - timeSinceIssue;

      // Обновяване на токена 30 секунди преди изтичане
      const timeBeforeRefresh = timeUntilExpire - 30000;

      if (timeBeforeRefresh > 0) {
        setTimeout(() => {
          refreshToken();
        }, timeBeforeRefresh);
      } else {
        console.log("Token is already expired or close to expiring.");
        refreshToken(); // Ако токенът е изтекъл или е близо до изтичане
      }
    }
  }, [tokenIssuedTime, refreshToken, tokenLifetime]);

  // Функция за взимане на потребителските данни
  const fetchUser = useCallback(
    async (accessToken = token) => {
      console.log("Fetching user data with token:", accessToken);

      if (accessToken) {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
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
    },
    [token, refreshToken]
  );

  useEffect(() => {
    console.log("Fetching user data on mount...");
    fetchUser();
    startTokenRefreshTimer(); // Стартира таймера за рефрешване на токена
  }, [fetchUser, startTokenRefreshTimer]);

  const logout = () => {
    console.log("Logging out, removing access token...");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("tokenIssuedTime");
    setUser(null);
    setToken(null);
    setTokenIssuedTime(null);
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
