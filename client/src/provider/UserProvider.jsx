import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getLocalStorageUser = localStorage.getItem("user");
    if (getLocalStorageUser) {
      const localUser = JSON.parse(getLocalStorageUser);
      setUser({
        username: localUser.username || "",
        accessToken: localUser.accessToken || "",
      });
    }
  }, []);

  const setLocalStorageUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({
      username: userData.username || "",
      accessToken: userData.accessToken || "",
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, setLocalStorageUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
