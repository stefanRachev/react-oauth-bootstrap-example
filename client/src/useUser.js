import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  return useContext(UserContext);
};


// import { useUser } from './useUser'; // Пътят трябва да е коректен

// const SomeComponent = () => {
//   const { user } = useUser();

//   return (
//     <div>
//       {user ? <p>Welcome, {user.username}!</p> : <p>Loading...</p>}
//     </div>
//   );
// };