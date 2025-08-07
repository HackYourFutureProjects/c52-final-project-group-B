import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@heroui/react";
import SignupModal from "@/components/Modals/SignupModal";
import LoginModal from "@/components/Modals/LoginModal";

const UserAuth = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isFocusable
            as="button"
            className="hover:bg-primary cursor-pointer transition"
            color="default"
            name=""
            size="sm"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="faded">
          <DropdownItem key="login" onPress={() => setIsLoginOpen(true)}>
            Log in
          </DropdownItem>
          <DropdownItem key="signup" onPress={() => setIsSignupOpen(true)}>
            Sign up
          </DropdownItem>
        </DropdownMenu>
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
