import PropTypes from "prop-types";
import { UserContext } from "@/context/UserContext";

export default function UserProvider({ children }) {
  return (
    <UserContext.Provider value={{ user: null }}>
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
