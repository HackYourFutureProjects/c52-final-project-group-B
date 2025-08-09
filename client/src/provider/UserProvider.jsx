import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { refreshAccessToken } from "@/api/userAPI";

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
        refreshToken: localUser.refreshToken || "",
      });
    }
  }, []);

  const setLocalStorageUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({
      username: userData.username || "",
      accessToken: userData.accessToken || "",
      refreshToken: userData.refreshToken || "",
    });
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const refreshToken = async () => {
    if (!user || !user.refreshToken) return;

    const newTokens = await refreshAccessToken(user.refreshToken);
    if (newTokens) {
      setLocalStorageUser(newTokens);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setLocalStorageUser, logoutUser, refreshToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
