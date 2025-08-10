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
import { MailIcon } from "@/components/Icons";

const ResetPasswordModal = ({
  isResetPasswordOpen,
  setIsResetPasswordOpen,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = Object.fromEntries(new FormData(e.currentTarget));
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isResetPasswordOpen}
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
      onOpenChange={setIsResetPasswordOpen}
      classNames={{ base: "rounded-[35px] pt-1", closeButton: "m-3" }}
    >
      <ModalContent>
        <Form className="block" onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Reset Password
            <p className="text-default-800 text-sm">
              Please enter your email address to reset your password.
            </p>
          </ModalHeader>
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
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              radius="full"
              type="submit"
              className="w-full"
            >
              Reset Password
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  isResetPasswordOpen: PropTypes.bool.isRequired,
  setIsResetPasswordOpen: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
