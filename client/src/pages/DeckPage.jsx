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
} from "@heroui/react";
import {
  CardsIcon,
  LightBulbIcon,
  PencilIcon,
  BookMarkIcon,
  ShareIcon,
  MoreIcon,
  DeleteIcon,
} from "@/components/Icons";
import { DecksCard } from "@/components/Card";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";

const DeckPage = () => {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const getDeck = await getDeckById(id);
        setDeck(getDeck);
        
        const getCards = await getCardsByDeckId(id);
        setCards(getCards);
      } catch {
        navigate("/not-found");
      }
    };
    fetchDeckAndCards();
  }, [id, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Library`, path: `/library` },
            { label: `${deck?.title}`, path: `/decks/${id}` },
          ]}
        >
          {deck?.title}
        </Title>
      </div>
      <div className="bg-default-200 mt-20 flex flex-col gap-3 rounded-[35px] p-8">
        <h3 className="text-xl font-bold">Description</h3>
        <p>{deck?.description}</p>
      </div>
      <div className="mt-3 flex items-stretch justify-center gap-3">
        <div className="bg-default-200 flex flex-1 flex-col gap-3 rounded-[35px] p-8">
          <h3 className="text-xl font-bold">Your Progress</h3>
          <Progress
            showValueLabel={true}
            maxValue={deck?.cardsCount}
            label={`${deck?.progress || 0}/${deck?.cardsCount || 0} cards`}
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
              {deck?.language}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-stretch justify-center gap-3">
        <Button
          as={Link}
          href="#"
          className="bg-default-200 flex flex-1 gap-3 rounded-[35px] p-8 text-center text-xl font-bold"
          startContent={<CardsIcon />}
        >
          Card Mode
        </Button>
        <Button
          as={Link}
          href="#"
          className="bg-default-200 flex flex-1 gap-3 rounded-[35px] p-8 text-center text-xl font-bold"
          startContent={<LightBulbIcon />}
        >
          Learn Mode
        </Button>
        <Button
          as={Link}
          href="#"
          className="bg-default-200 flex flex-1 gap-3 rounded-[35px] p-8 text-center text-xl font-bold"
          startContent={<PencilIcon />}
        >
          Test Mode
        </Button>
      </div>

      <div className="mt-20 flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">
            This Deck has {deck?.cardsCount} cards
          </h3>
          <p className="text-gray-500">Start Learning these cards today!</p>
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

      <div className="mt-20 flex flex-wrap items-center justify-evenly gap-4">
        {cards &&
          cards.map((card) => (
            <DecksCard
              key={card._id}
              front={card.question}
              back={card.answer}
            />
          ))}
      </div>
    </>
  );
};

export default DeckPage;
