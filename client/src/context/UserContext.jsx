// //UserContext.jsx

// import PropTypes from "prop-types";
// import { createContext, useState, useEffect, useCallback } from "react";

// export const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("accessToken"));
//   const [tokenIssuedTime, setTokenIssuedTime] = useState(
//     localStorage.getItem("tokenIssuedTime") || Date.now()
//   );
//   const tokenLifetime = 60 * 60 * 1000;  // 1 час

//   const refreshToken = useCallback(async () => {
//     if (!token) return;

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/refresh-token`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();

//         localStorage.setItem("accessToken", data.accessToken);
//         localStorage.setItem("tokenIssuedTime", Date.now());
//         setToken(data.accessToken);
//         setTokenIssuedTime(Date.now());

//         await fetchUser(data.accessToken);
//         return data.accessToken;
//       } else {
//         console.error("Refresh token failed");
//         logout();
//         return null;
//       }
//     } catch (error) {
//       console.error("Error refreshing token:", error);
//       logout();
//       return null;
//     }
//   }, [token]);

//   const startTokenRefreshTimer = useCallback(() => {
//     if (tokenIssuedTime) {
//       const timeSinceIssue = Date.now() - tokenIssuedTime;
//       const timeUntilExpire = tokenLifetime - timeSinceIssue;

//       const timeBeforeRefresh = timeUntilExpire - 30000;

//       if (timeBeforeRefresh > 0) {
//         setTimeout(() => {
//           refreshToken();
//         }, timeBeforeRefresh);
//       } else {

//         refreshToken();
//       }
//     }
//   }, [tokenIssuedTime, refreshToken, tokenLifetime]);

//   const fetchUser = useCallback(
//     async (accessToken = token) => {
//       if (accessToken) {
//         try {
//           const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           });

//           if (response.status === 403) {

//             const newToken = await refreshToken();
//             if (newToken) {

//               const retryResponse = await fetch(
//                 `${import.meta.env.VITE_API_URL}/me`,
//                 {
//                   headers: {
//                     Authorization: `Bearer ${newToken}`,
//                   },
//                 }
//               );
//               if (retryResponse.ok) {
//                 const data = await retryResponse.json();
//                 setUser(data.user);
//               } else {
//                 console.error(
//                   "Error fetching user data after token refresh:",
//                   retryResponse.statusText
//                 );
//               }
//             }
//           } else if (response.ok) {
//             const data = await response.json();
//             setUser(data.user);
//           } else {
//             console.error("Error fetching user data:", response.statusText);
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     },
//     [token, refreshToken]
//   );

//   useEffect(() => {

//     fetchUser();
//     startTokenRefreshTimer();
//   }, [fetchUser, startTokenRefreshTimer]);

//   const logout = () => {

//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("tokenIssuedTime");
//     setUser(null);
//     setToken(null);
//     setTokenIssuedTime(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser, logout, refreshToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// UserContext.jsx

// UserContext.jsx

import PropTypes from "prop-types";
import { createContext, useState, useEffect, useCallback, useRef } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [tokenIssuedTime, setTokenIssuedTime] = useState(
    localStorage.getItem("tokenIssuedTime") || Date.now()
  );
  const tokenLifetime = 60 * 60 * 1000; // 1 час

  const fetchUserRef = useRef();
  fetchUserRef.current = async (accessToken = token) => {
    if (accessToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 403) {
          const newToken = await refreshToken();
          if (newToken) {
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
  };

  const refreshToken = useCallback(async () => {
    if (!token) return;

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

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("tokenIssuedTime", Date.now());
        setToken(data.accessToken);
        setTokenIssuedTime(Date.now());

      
        await fetchUserRef.current(data.accessToken);
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
  }, [token]);

  const startTokenRefreshTimer = useCallback(() => {
    if (tokenIssuedTime) {
      const timeSinceIssue = Date.now() - tokenIssuedTime;
      const timeUntilExpire = tokenLifetime - timeSinceIssue;

      const timeBeforeRefresh = timeUntilExpire - 30000;

      if (timeBeforeRefresh > 0) {
        setTimeout(() => {
          refreshToken();
        }, timeBeforeRefresh);
      } else {
        refreshToken();
      }
    }
  }, [tokenIssuedTime, refreshToken, tokenLifetime]);

  useEffect(() => {
    fetchUserRef.current(); 
    startTokenRefreshTimer();
  }, [startTokenRefreshTimer]);

  const logout = () => {
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
