import PropTypes from "prop-types";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { LockedIcon, MailIcon } from "@/components/Icons";
import { loginUser } from "@/api/userAPI";

const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
  const { setLocalStorageUser, setIsSignupOpen, setIsResetPasswordOpen } =
    useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      console.log("test1");

      if (response.accessToken) {
        console.log("test2");
        setLocalStorageUser(response);
      }

      console.log("test3");

      setIsLoginOpen(false);

      addToast({
        title: "Success",
        description: "You have successfully logged in!",
        color: "success",
        radius: "full",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to login",
        color: "danger",
        radius: "full",
      });
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isLoginOpen}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="center"
      onOpenChange={setIsLoginOpen}
      classNames={{ base: "rounded-[35px] pt-1", closeButton: "m-3" }}
    >
      <ModalContent>
        <Form className="block" onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>

          <ModalBody>
            <Input
              isRequired
              color="primary"
              radius="full"
              variant="bordered"
              endContent={
                <MailIcon className="text-default pointer-events-none" />
              }
              label="Email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={email}
              onValueChange={setEmail}
            />
            <Input
              isRequired
              color="primary"
              radius="full"
              variant="bordered"
              endContent={
                <LockedIcon
                  size={28}
                  className="text-default pointer-events-none"
                />
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onValueChange={setPassword}
              isInvalid={password.length < 6 && password !== ""}
              errorMessage={
                <span>Password must be at least 6 characters long</span>
              }
            />
            <Button
              color="danger"
              variant="light"
              radius="full"
              onPress={() => {
                setIsLoginOpen(false);
                setIsResetPasswordOpen(true);
              }}
            >
              Forgot password?
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              radius="full"
              type="button"
              className="w-full"
              onPress={() => {
                setIsLoginOpen(false);
                setIsSignupOpen(true);
              }}
            >
              Signup
            </Button>
            <Button
              color="primary"
              radius="full"
              type="submit"
              className="w-full"
            >
              Login
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

LoginModal.propTypes = {
  isLoginOpen: PropTypes.bool.isRequired,
  setIsLoginOpen: PropTypes.func.isRequired,
};

export default LoginModal;
