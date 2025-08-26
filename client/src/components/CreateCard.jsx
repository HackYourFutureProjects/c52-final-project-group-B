import PropTypes from "prop-types";
import { Reorder, useDragControls } from "framer-motion";
import StylishDiv from "./StylishDiv";
import { PiDotsSixVerticalBold, PiTrash } from "react-icons/pi";
import { Input, Button, Divider, Tooltip } from "@heroui/react";

const CreateCard = ({ card, index, updateCard, removeCard }) => {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={card.id}
      value={card}
      id={card.id}
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{ scale: 0.95 }}
    >
      <StylishDiv className="flex w-full flex-col items-center p-4 md:flex-row md:flex-nowrap md:p-4">
        <div className="text-secondary ml-2 flex flex-col items-center gap-2 text-xl font-bold md:flex-row">
          <PiDotsSixVerticalBold
            size={30}
            onPointerDown={(event) => dragControls.start(event)}
            style={{ touchAction: "none" }}
            className="hover:bg-secondary/20 rotate-90 cursor-grab rounded-sm transition-colors active:cursor-grabbing md:rotate-0"
          />
          <div>
            <span className="md:hidden">Card #</span>
            {index + 1}
          </div>
        </div>
        <Divider
          orientation="vertical"
          className="bg-secondary/40 hidden h-10 w-[2px] md:block"
        />
        <Input
          name={`question-${card.id}`}
          label="Enter the question"
          type="text"
          radius="full"
          variant="faded"
          color="secondary"
          value={card.question}
          onChange={(e) => updateCard(card.id, "question", e.target.value)}
          isRequired
          minLength={1}
          maxLength={100}
          className="items-center md:items-start"
          classNames={{
            inputWrapper: "px-5 items-center md:items-start",
            input: "text-center md:text-left",
          }}
        />
        <Divider
          orientation="vertical"
          className="bg-secondary/40 hidden h-10 w-[2px] md:block"
        />
        <Input
          name={`answer-${card.id}`}
          label="Enter the answer"
          type="text"
          radius="full"
          variant="faded"
          color="secondary"
          value={card.answer}
          onChange={(e) => updateCard(card.id, "answer", e.target.value)}
          isRequired
          minLength={1}
          maxLength={100}
          className="items-center md:items-start"
          classNames={{
            inputWrapper: "px-5 items-center md:items-start",
            input: "text-center md:text-left",
          }}
        />
        <Divider
          orientation="vertical"
          className="bg-secondary/40 hidden h-10 w-[2px] md:block"
        />
        <Tooltip
          content="Delete Card"
          showArrow={true}
          delay={0}
          closeDelay={0}
          radius="full"
        >
          <Button
            isIconOnly
            variant="faded"
            color="secondary"
            radius="full"
            size="lg"
            onPress={() => removeCard(card.id)}
          >
            <PiTrash size={25} />
          </Button>
        </Tooltip>
      </StylishDiv>
    </Reorder.Item>
  );
};

CreateCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateCard: PropTypes.func.isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default CreateCard;
