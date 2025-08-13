import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import { UserContext } from "@/context/UserContext";
import SignupModal from "@/components/Modals/SignupModal";
import LoginModal from "@/components/Modals/LoginModal";
import ResetPasswordModal from "./Modals/ResetPasswordModal";

const UserAuth = () => {
  const {
    user,
    logoutUser,
    isSignupOpen,
    setIsSignupOpen,
    isLoginOpen,
    setIsLoginOpen,
    isResetPasswordOpen,
    setIsResetPasswordOpen,
  } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isFocusable
            as="button"
            className="hover:bg-primary hover:text-default cursor-pointer transition"
            color="default"
            name={user?.username?.charAt(0) ?? ""}
            size="sm"
          />
        </DropdownTrigger>
        {user ? (
          <DropdownMenu
            aria-label="Profile Actions"
            disabledKeys={["loggedIn"]}
            variant="faded"
          >
            <DropdownItem
              key="loggedIn"
              className="font-bold"
              color="primary"
              textValue={`Logged in as @${user.username}`}
            >
              Logged in as @{user.username}
            </DropdownItem>
            <DropdownItem key="profile" onPress={() => navigate("/profile")}>
              Profile
            </DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onPress={() => logoutUser()}
            >
              Log out
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Profile Actions" variant="faded">
            <DropdownItem key="login" onPress={() => setIsLoginOpen(true)}>
              Log in
            </DropdownItem>
            <DropdownItem key="signup" onPress={() => setIsSignupOpen(true)}>
              Sign up
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>

      <LoginModal isLoginOpen={isLoginOpen} setIsLoginOpen={setIsLoginOpen} />

      <SignupModal
        isSignupOpen={isSignupOpen}
        setIsSignupOpen={setIsSignupOpen}
      />

      <ResetPasswordModal
        isResetPasswordOpen={isResetPasswordOpen}
        setIsResetPasswordOpen={setIsResetPasswordOpen}
      />
    </>
  );
};

export default UserAuth;
