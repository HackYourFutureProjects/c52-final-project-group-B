import PropTypes from "prop-types";
import { useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Chip,
} from "@heroui/react";
import cn from "@/util/cn";
import { ROUTES } from "@/routes/paths.js";
import { UserContext } from "@/context/UserContext";

const Deck = ({ deck, className, origin }) => {
  const { user: currentUser } = useContext(UserContext);
  const {
    _id: deckID,
    title,
    description,
    userInfo,
    cardsCount: numCards,
  } = deck;

  const navigate = useNavigate();

  const to = ROUTES.DECK_DETAILS(deckID);
  const fromState = origin === "my-decks" ? { from: "my-decks" } : undefined;
  const toWithQuery = origin === "my-decks" ? `${to}?from=my-decks` : to;

  const avatarUrl =
    userInfo?.profilePictureUrl || currentUser?.profilePictureUrl || "";
  const creatorName = userInfo?.username || currentUser?.username || "Me";

  return (
    <Card
      isPressable
      shadow="sm"
      className={cn(
        "min-h-[250px] max-w-[400px] min-w-[300px] flex-1 px-3 py-2",
        className
      )}
      classNames={{ base: "rounded-[35px]" }}
      onPress={() => navigate(toWithQuery, { state: fromState })}
    >
      <CardHeader className="flex items-start justify-between gap-3">
        <p className="heading-title text-left font-bold">{title}</p>
        <Chip>{numCards} Cards</Chip>
      </CardHeader>

      <CardBody>
        <p className="line-clamp-3">{description}</p>
      </CardBody>

      <CardFooter className="justify-between">
        <div className="flex gap-3">
          <Avatar
            showFallback
            isBordered
            color="primary"
            radius="full"
            size="md"
            src={avatarUrl}
          />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-default-700 text-xs leading-none font-semibold">
              Created by
            </h4>
            <h5 className="text-primary tracking-tight">{creatorName}</h5>
          </div>
        </div>

        <Button
          as={RouterLink}
          to={toWithQuery}
          state={fromState}
          isIconOnly
          color="primary"
          radius="full"
          size="md"
          variant="solid"
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
  deck: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    userInfo: PropTypes.shape({
      username: PropTypes.string,
      profilePictureUrl: PropTypes.string,
    }),
    cardsCount: PropTypes.number.isRequired,
  }).isRequired,
  className: PropTypes.string,
  origin: PropTypes.oneOf(["my-decks"]),
};

export default Deck;
