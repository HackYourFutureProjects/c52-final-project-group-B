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
import { requestPasswordReset } from "@/api/userAPI";
import { PiEnvelopeSimple } from "react-icons/pi";

const ResetPasswordModal = ({
  isResetPasswordOpen,
  setIsResetPasswordOpen,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await requestPasswordReset({
        email: data.email,
      });

      setIsResetPasswordOpen(false);

      addToast({
        title: "Success",
        description: "Password reset email sent successfully!",
        color: "success",
        radius: "full",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to reset password",
        color: "danger",
        radius: "full",
      });
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isResetPasswordOpen}
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
      onOpenChange={setIsResetPasswordOpen}
      classNames={{ base: "rounded-[35px] pt-1", closeButton: "m-3" }}
    >
      <ModalContent>
        <Form className="block" onSubmit={handleSubmit}>
          <ModalHeader className="text-primary flex flex-col gap-1">
            Reset Password
            <p className="text-foreground text-sm">
              Please enter your email address to reset your password.
            </p>
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              color="primary"
              radius="full"
              variant="faded"
              endContent={
                <PiEnvelopeSimple
                  className="m-auto md:block"
                  size={30}
                  fill="hsl(var(--heroui-primary))"
                />
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
