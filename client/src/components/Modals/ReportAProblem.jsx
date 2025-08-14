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
  Textarea,
} from "@heroui/react";
import { sendProblemReport } from "@/api/userAPI";
import { MailIcon } from "@/components/Icons";
import { MdOutlineMessage } from "react-icons/md";

const ReportAProblemModal = ({
  isReportAProblemOpen,
  setIsReportAProblemOpen,
  location,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await sendProblemReport({
        email: data.email,
        subject: data.subject,
        description: data.description,
        location: location,
      });

      setIsReportAProblemOpen(false);

      addToast({
        title: "Success",
        description: "Problem report sent successfully!",
        color: "success",
        radius: "full",
      });
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to send report",
        color: "danger",
        radius: "full",
      });
    }
  };

  return (
    <Modal
      backdrop="blur"
      isOpen={isReportAProblemOpen}
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
      onOpenChange={setIsReportAProblemOpen}
      classNames={{ base: "rounded-[35px] pt-1", closeButton: "m-3" }}
    >
      <ModalContent>
        <Form className="block" onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            Report A Problem
            <p className="text-default-800 text-sm"></p>
          </ModalHeader>
          <ModalBody>
            <Input
              isRequired
              color="primary"
              radius="full"
              variant="bordered"
              endContent={
                <MdOutlineMessage
                  size={24}
                  className="text-default pointer-events-none"
                />
              }
              label="Subject"
              name="subject"
              placeholder="Enter the subject"
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
            <Textarea
              isRequired
              color="primary"
              variant="bordered"
              label="Description"
              name="description"
              placeholder="Describe the problem you encountered"
              classNames={{
                inputWrapper: "rounded-[25px]",
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              radius="full"
              type="submit"
              className="w-full"
            >
              Submit Report
            </Button>
          </ModalFooter>
        </Form>
      </ModalContent>
    </Modal>
  );
};

ReportAProblemModal.propTypes = {
  isReportAProblemOpen: PropTypes.bool.isRequired,
  setIsReportAProblemOpen: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default ReportAProblemModal;
