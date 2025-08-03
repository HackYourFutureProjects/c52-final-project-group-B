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
import { getCardsByDeckId } from "@/api/cardsAPI";

const DeckPage = () => {
  const [cards, setCards] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const result = await getCardsByDeckId(id);
        setCards(result);
      } catch {
        navigate("/not-found");
      }
    };
    fetchCards();
  }, [id, navigate]);

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Library`, path: `/library` },
            { label: `Deck ID: ${id}`, path: `/decks/${id}` },
          ]}
        >
          Deck ID: {id}
        </Title>
      </div>
      <div className="bg-default-200 mt-20 flex flex-col gap-3 rounded-[35px] p-8">
        <h3 className="text-xl font-bold">Description</h3>
        <p>
          This deck contains basic vocabulary and grammar to start learning
          Spanish.
        </p>
      </div>
      <div className="mt-3 flex items-stretch justify-center gap-3">
        <div className="bg-default-200 flex flex-1 flex-col gap-3 rounded-[35px] p-8">
          <h3 className="text-xl font-bold">Your Progress</h3>
          <Progress
            showValueLabel={true}
            maxValue={58}
            label="15/58 cards"
            value={15}
            classNames={{
              label: "text-sm text-gray-500",
              value: "text-sm text-gray-500",
              track: "bg-primary/20",
            }}
          />
        </div>
        <div className="bg-default-200 flex flex-1 flex-col gap-3 rounded-[35px] p-8">
          <h3 className="text-xl font-bold">Languages</h3>
          <div className="flex gap-2">
            <Button radius="full" as={Link} href="#">
              English
            </Button>
            <Button radius="full" as={Link} href="#">
              Spanish
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
          <h3 className="text-xl font-bold">This Deck has 58 cards</h3>
          <p className="text-gray-500">Start Learning these cards today!</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            as={Link}
            href="#"
            isIconOnly
            radius="full"
            size="lg"
            className="p-3"
          >
            <BookMarkIcon />
          </Button>

          <Button
            as={Link}
            href="#"
            isIconOnly
            radius="full"
            size="lg"
            className="p-3"
          >
            <ShareIcon />
          </Button>
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
        {cards.map((card) => (
          <DecksCard key={card._id} front={card.question} back={card.answer} />
        ))}
      </div>
    </>
  );
};

export default DeckPage;
