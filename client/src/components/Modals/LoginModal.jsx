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
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { LockedIcon, MailIcon } from "@/components/Icons";
import { loginUser } from "@/api/userAPI";

const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
  const { setLocalStorageUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (response.accessToken) {
        setLocalStorageUser(response);
      }

      setIsLoginOpen(false);
      navigate(`/dashboard`);
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
