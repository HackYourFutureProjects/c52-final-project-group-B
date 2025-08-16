import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Title from "@/components/Title";
import {
  Progress,
  Button,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
  Spinner,
} from "@heroui/react";
import {
  CardsIcon,
  PencilIcon,
  BookMarkIcon,
  ShareIcon,
  MoreIcon,
  DeleteIcon,
} from "@/components/Icons";
import { DecksCard } from "@/components/Card";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";
import { ROUTES } from "@/routes/paths";

const DeckPage = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let isCancelled = false;

    const fetchDeckAndCards = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [deckResult, cardsResult] = await Promise.allSettled([
          getDeckById(id),
          getCardsByDeckId(id),
        ]);

        if (isCancelled) return;

        if (deckResult.status === "fulfilled" && deckResult.value) {
          setDeck(deckResult.value);
        } else {
          navigate(ROUTES.NOT_FOUND);
          return;
        }

        if (
          cardsResult.status === "fulfilled" &&
          Array.isArray(cardsResult.value)
        ) {
          setCards(cardsResult.value);
        } else {
          setCards([]);
        }
      } catch (e) {
        if (!isCancelled) {
          setError(e?.message || "Failed to load deck");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    if (id) {
      fetchDeckAndCards();
    } else {
      navigate(ROUTES.NOT_FOUND);
    }

    return () => {
      isCancelled = true;
    };
  }, [id, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: `Library`, path: ROUTES.DECKS },
            {
              label: `${deck?.title || (isLoading ? "Loading..." : "Deck")}`,
              path: `${ROUTES.DECK_DETAILS?.(id)}`,
            },
          ]}
        >
          {deck?.title || (isLoading ? "Loading..." : "")}
        </Title>
        {error && <p className="text-danger mt-2 text-sm">{error}</p>}
      </div>

      <div className="bg-default-200 mt-20 flex flex-col gap-3 rounded-[35px] p-8">
        <h3 className="text-xl font-bold">Description</h3>
        <p>
          {deck?.description ||
            (isLoading
              ? "Fetching deck details..."
              : "No description available.")}
        </p>
      </div>

      <div className="mt-3 flex items-stretch justify-center gap-3">
        <div className="bg-default-200 flex flex-1 flex-col gap-3 rounded-[35px] p-8">
          <h3 className="text-xl font-bold">Your Progress</h3>
          <Progress
            showValueLabel={true}
            maxValue={
              deck?.cardsCount || (Array.isArray(cards) ? cards.length : 0)
            }
            label={`${deck?.progress || 0}/${deck?.cardsCount || (Array.isArray(cards) ? cards.length : 0)} cards`}
            value={deck?.progress || 0}
            classNames={{
              label: "text-sm text-gray-500",
              value: "text-sm text-gray-500",
              track: "bg-primary/20",
            }}
          />
        </div>

        <div className="bg-default-200 flex flex-1 flex-col gap-3 rounded-[35px] p-8">
          <h3 className="text-xl font-bold">Languages</h3>
          <div className="flex gap-2 capitalize">
            <Button radius="full" as={Link} href="#">
              {deck?.language || (isLoading ? "..." : "unknown")}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-20 flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">
            This Deck has{" "}
            {deck?.cardsCount ?? (Array.isArray(cards) ? cards.length : 0)}{" "}
            cards
          </h3>
          <p className="text-gray-500">Start learning using the card mode!</p>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip
            content="Save Deck"
            showArrow={true}
            delay={0}
            closeDelay={0}
            radius="full"
          >
            <Button
              isIconOnly
              radius="full"
              size="lg"
              className="p-3"
              onPress={() => {}}
            >
              <BookMarkIcon />
            </Button>
          </Tooltip>

          <Tooltip
            content="Share Deck"
            showArrow={true}
            delay={0}
            closeDelay={0}
            radius="full"
          >
            <Button
              isIconOnly
              radius="full"
              size="lg"
              className="p-3"
              onPress={() => {}}
            >
              <ShareIcon />
            </Button>
          </Tooltip>

          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button as={Link} href="#" isIconOnly radius="full" size="lg">
                <MoreIcon size={30} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
              <DropdownItem
                key="edit"
                endContent={<PencilIcon size={20} />}
                href="#"
              >
                Edit Deck
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                endContent={<DeleteIcon size={20} />}
              >
                Delete Deck
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <Button
          as={Link}
          href={ROUTES.DECK_CARD_MODE(id)}
          className="bg-default-200 flex flex-1 gap-3 rounded-[35px] p-8 text-center text-xl font-bold"
          startContent={<CardsIcon />}
        >
          Card Mode
        </Button>
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-evenly gap-4">
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((card) => (
            <DecksCard
              key={card._id}
              front={card.question}
              back={card.answer}
            />
          ))
        ) : (
          <div className="flex w-full justify-center py-10">
            {isLoading ? (
              <Spinner size="lg" color="primary" />
            ) : (
              <p className="text-gray-500">No cards in this deck yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DeckPage;
