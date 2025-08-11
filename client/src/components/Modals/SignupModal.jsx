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
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { LockedIcon, MailIcon, UserIcon } from "@/components/Icons";
import { createUser } from "@/api/userAPI";

const SignupModal = ({ isSignupOpen, setIsSignupOpen }) => {
  const { setLocalStorageUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await createUser({
        username: data.username,
        email: data.email,
        password: data.password,
      });

      if (response.accessToken) {
        setLocalStorageUser(response);
      }

      setIsSignupOpen(false);
      addToast({
        title: "Success",
        description: "User created successfully",
        color: "success",
        radius: "full",
      });
      navigate(`/profile`);
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to create user",
        color: "danger",
        radius: "full",
      });
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isSignupOpen}
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
      onOpenChange={setIsSignupOpen}
      classNames={{ base: "rounded-[35px] pt-1", closeButton: "m-3" }}
    >
      <ModalContent>
        <Form className="block" onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>

          <ModalBody>
            <Input
              isRequired
              color="primary"
              radius="full"
              variant="bordered"
              endContent={
                <UserIcon className="text-default pointer-events-none" />
              }
              label="Username"
              name="username"
              placeholder="Enter your username"
              type="text"
            />
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
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              radius="full"
              type="submit"
              className="w-full"
            >
              Sign up
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

SignupModal.propTypes = {
  isSignupOpen: PropTypes.bool.isRequired,
  setIsSignupOpen: PropTypes.func.isRequired,
};

export default SignupModal;
