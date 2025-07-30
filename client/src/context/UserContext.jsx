import { createContext, useContext } from "react";
import { TEST_USER } from "../constants/testUser";

const UserContext = createContext(TEST_USER);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  return (
    <UserContext.Provider value={TEST_USER}>{children}</UserContext.Provider>
  );
};
