import { useState, useContext } from "react";
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

const UserAuth = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isFocusable
            as="button"
            className="hover:bg-primary cursor-pointer transition-transform"
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
            <DropdownItem
              key="dashboard"
              onPress={() => navigate("/dashboard")}
            >
              Dashboard
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
    </>
  );
};

export default UserAuth;
