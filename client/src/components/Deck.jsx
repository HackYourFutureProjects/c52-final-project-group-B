import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Link,
  Chip,
} from "@heroui/react";

const Deck = ({ deckID, title, description, user, numCards }) => {
  const navigate = useNavigate();
  return (
    <Card
      isPressable
      shadow="sm"
      className="min-h-[250px] max-w-[400px] px-3 py-2"
      classNames={{ base: "rounded-[35px]" }}
      onPress={() => navigate(`./deck/${deckID}`)}
    >
      <CardHeader className="flex items-center justify-between gap-3">
        <p className="heading-title items-center font-bold">{title}</p>
        <Chip>{numCards} Cards</Chip>
      </CardHeader>
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <CardFooter className="justify-between">
        <div className="flex gap-3">
          <Avatar
            color="primary"
            radius="full"
            size="md"
            name="A"
            classNames={{ base: "bg-transparent border-2 text-primary" }}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-default-700 text-xs leading-none font-semibold">
              Created by
            </h4>
            <h5 className="text-primary tracking-tight">{user}</h5>
          </div>
        </div>
        <Button
          as={Link}
          isIconOnly
          color="primary"
          radius="full"
          size="md"
          variant="solid"
          href={`./deck/${deckID}`}
        >
          <svg
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

Deck.propTypes = {
  deckID: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  numCards: PropTypes.number.isRequired,
};

export default Deck;
