import PropTypes from "prop-types";
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { LockedIcon, MailIcon } from "@/components/icons";

const LoginModal = ({ isLoginOpen, setIsLoginOpen }) => {
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
        <Form className="block">
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
