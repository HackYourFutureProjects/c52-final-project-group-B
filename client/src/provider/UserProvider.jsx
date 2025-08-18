import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { refreshAccessToken } from "@/api/userAPI";
import { addToast } from "@heroui/react";
import { ROUTES } from "@/routes/paths.js";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getLocalStorageUser = localStorage.getItem("user");
    if (getLocalStorageUser) {
      const localUser = JSON.parse(getLocalStorageUser);
      setUser({
        userid: localUser.userid || "",
        username: localUser.username || "",
        profilePictureUrl: localUser.profilePictureUrl || "",
        accessToken: localUser.accessToken || "",
        refreshToken: localUser.refreshToken || "",
      });
    }
    setIsUserLoaded(true);
  }, []);

  const setLocalStorageUser = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({
      userid: userData.userid || "",
      username: userData.username || "",
      profilePictureUrl: userData.profilePictureUrl || "",
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken,
    });
    setIsUserLoaded(true);
  };

  const updateUser = (userData) => {
    const getLocalStorageUser = localStorage.getItem("user");
    if (getLocalStorageUser) {
      const localUser = JSON.parse(getLocalStorageUser);
      const updatedUser = {
        userid: localUser.userid || "",
        username: userData.username || "",
        profilePictureUrl: userData.profilePictureUrl || "",
        accessToken: localUser.accessToken || "",
        refreshToken: localUser.refreshToken || "",
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsUserLoaded(false);
    addToast({
      title: "Logged out",
      description: "You have successfully logged out.",
      color: "success",
      radius: "full",
    });
    navigate(ROUTES.HOME);
  };

  const refreshToken = async () => {
    try {
      const newTokens = await refreshAccessToken(user.refreshToken);
      if (newTokens) {
        setLocalStorageUser(newTokens);
      }
    } catch {
      addToast({
        title: "Session Expired",
        description: "Your session has expired. Please log in again.",
        color: "error",
        radius: "full",
      });
      logoutUser();
    }
  };

  const forceLogin = () => {
    setIsLoginOpen(true);
    addToast({
      title: "Login Required",
      description: "You need to log in to access this feature.",
      color: "warning",
      radius: "full",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isUserLoaded,
        setLocalStorageUser,
        updateUser,
        logoutUser,
        refreshToken,
        isSignupOpen,
        setIsSignupOpen,
        isLoginOpen,
        setIsLoginOpen,
        isResetPasswordOpen,
        setIsResetPasswordOpen,
        forceLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
