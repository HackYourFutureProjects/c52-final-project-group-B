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
  Select,
  SelectItem,
} from "@heroui/react";
import { sendProblemReport } from "@/api/userAPI";

const ReportAProblemModal = ({
  isReportAProblemOpen,
  setIsReportAProblemOpen,
  sourceDetails,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await sendProblemReport({
        problemType: data.problemType,
        moreInfo: data.moreInfo,
        source: sourceDetails,
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
            <Select
              isRequired
              disallowEmptySelection
              color="primary"
              radius="full"
              variant="bordered"
              label="Problem Type"
              placeholder="Select the problem type"
              name="problemType"
            >
              <SelectItem key={"Spelling Mistake"}>Spelling Mistake</SelectItem>
              <SelectItem key={"Incorrect Answer"}>Incorrect Answer</SelectItem>
              <SelectItem key={"Blank Card"}>Blank Card</SelectItem>
              <SelectItem key={"Other Issue"}>Other Issue</SelectItem>
            </Select>
            <Input
              color="primary"
              radius="full"
              variant="bordered"
              label="Additional Information"
              name="moreInfo"
              placeholder="Enter any additional information"
              type="text"
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
  sourceDetails: PropTypes.shape({
    deckId: PropTypes.string.isRequired,
    deckTitle: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ReportAProblemModal;
