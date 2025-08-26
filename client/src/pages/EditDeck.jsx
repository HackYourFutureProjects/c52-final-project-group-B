import {
  PiTrash,
  PiLockKey,
  PiLockKeyOpen,
  PiPlus,
  PiDownloadSimple,
} from "react-icons/pi";
import Title from "@/components/Title";
import {
  addToast,
  Form,
  Input,
  Textarea,
  Select,
  SelectItem,
  Avatar,
  Button,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateDeck, getDeckById } from "@/api/decksAPI";
import {
  createCard,
  updateCardById,
  deleteCardById,
  getCardsByDeckId,
} from "@/api/cardsAPI";
import languages from "@/data/languages.js";
import { ROUTES } from "@/routes/paths.js";
import Papa from "papaparse";
import StylishDiv from "@/components/StylishDiv";
import { Reorder } from "framer-motion";
import CreateCard from "@/components/CreateCard";

const EditDeck = () => {
  const [cards, setCards] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importedCards, setImportedCards] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const deckData = await getDeckById(id);
        setDeck(deckData);
        setIsPublic(deckData.isPublic);

        const cardsData = await getCardsByDeckId(id);
        const formattedCards = cardsData.map((card, index) => ({
          id: card._id,
          question: card.question,
          answer: card.answer,
          order: card?.order !== 0 ? card.order : index,
          isNew: false,
        }));
        setCards(formattedCards);
        setIsLoading(false);
      } catch {
        addToast({
          title: "Error",
          description: "Failed to load deck data",
          color: "danger",
          radius: "full",
        });
        navigate(ROUTES.NOT_FOUND);
      }
    };
    fetchDeckAndCards();
  }, [id, navigate]);

  const addCard = () => {
    const newCard = {
      id: `new-${Date.now()}`,
      question: "",
      answer: "",
      order: cards.length,
      isNew: true,
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (cardId) => {
    if (cards.length > 1) {
      const updateCards = cards.map((card) => {
        if (card.id === cardId) {
          return { ...card, isDeleted: true };
        }
        return card;
      });
      setCards(updateCards);
    } else {
      addToast({
        title: "Error",
        description: "At least one card is required",
        color: "danger",
        radius: "full",
      });
    }
  };

  const updateCard = (cardId, field, value) => {
    setCards(
      cards.map((card) =>
        card.id === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  const importCards = () => {
    Papa.parse(importedCards, {
      header: false,
      complete: function (results) {
        const filteredData = results.data.map((row, index) => {
          return {
            id: Date.now() + index,
            question: row[0],
            answer: row[1],
            order: cards.length + index,
            isNew: true,
          };
        });
        setCards([...cards, ...filteredData]);
        addToast({
          title: "Success",
          description: `Successfully imported ${filteredData.length} cards`,
          color: "success",
          radius: "full",
        });
        setImportedCards("");
        setIsImportOpen(false);
      },
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const allLanguages = new FormData(e.currentTarget).getAll("language");
    try {
      await updateDeck(id, {
        title: data.title,
        description: data.description,
        language: allLanguages,
        isPublic: isPublic,
      });

      const cardPromises = [];

      cards.forEach((card, index) => {
        if (card.isNew && card.question && card.answer) {
          cardPromises.push(
            createCard({
              deckId: id,
              question: card.question,
              answer: card.answer,
              order: index,
            })
          );
        } else if (!card.isNew && card.isDeleted) {
          cardPromises.push(deleteCardById(id, card.id));
        } else if (!card.isNew && card.question && card.answer) {
          cardPromises.push(
            updateCardById(id, card.id, {
              question: card.question,
              answer: card.answer,
              order: index,
            })
          );
        }
      });

      await Promise.all(cardPromises);

      addToast({
        title: "Success",
        description: "Deck updated successfully",
        color: "success",
        radius: "full",
      });

      navigate(ROUTES.DECK_DETAILS(id));
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to update deck",
        color: "danger",
        radius: "full",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Deck: ${deck?.title}`, path: ROUTES.DECK_DETAILS(id) },
            { label: `Edit Deck`, path: ROUTES.DECK_EDIT(id) },
          ]}
        >
          Edit Deck
        </Title>
      </div>

      <Form className="mt-20 items-stretch" onSubmit={onSubmit}>
        <StylishDiv className="flex flex-col">
          <Input
            name="title"
            label="Enter Deck Title"
            type="text"
            radius="full"
            variant="faded"
            color="secondary"
            isRequired
            minLength={2}
            maxLength={100}
            defaultValue={deck?.title}
            className="items-center md:items-start"
            classNames={{
              inputWrapper: "px-5 items-center md:items-start",
              input: "text-center md:text-left",
            }}
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter Deck description"
            variant="faded"
            color="secondary"
            isRequired
            minLength={10}
            maxLength={500}
            defaultValue={deck?.description}
            classNames={{
              inputWrapper: "px-5 rounded-[25px] items-center md:items-start",
              input: "text-center md:text-left",
            }}
          />
          <Select
            name="language"
            label="Language"
            radius="full"
            variant="faded"
            color="secondary"
            selectionMode="multiple"
            defaultSelectedKeys={deck?.language}
            isRequired
            isClearable
            className="items-center text-center md:items-start md:text-left"
            classNames={{
              trigger: "px-5 items-center md:items-start",
              value: "text-center md:text-left",
            }}
          >
            {languages.map((language) => (
              <SelectItem
                key={language.key}
                value={language.key}
                startContent={
                  <Avatar
                    alt={language.label}
                    className="h-6 w-6"
                    src={`https://flagcdn.com/${language.code}.svg`}
                  />
                }
              >
                {language.label}
              </SelectItem>
            ))}
          </Select>
        </StylishDiv>

        <div className="mt-5 flex flex-col items-center justify-center gap-4 text-center md:mt-20 md:flex-row md:justify-between md:text-left">
          <div className="mt-10 flex flex-col md:mt-0">
            <h3 className="text-secondary text-xl font-bold">Edit cards</h3>
            <p>
              Below you can modify existing cards or add new ones to your deck.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip
              content="Import Cards"
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
                onPress={() => setIsImportOpen(true)}
              >
                <PiDownloadSimple size={25} />
              </Button>
            </Tooltip>
            <Tooltip
              content="Delete Cards"
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
                onPress={() => setCards([{ id: 1, question: "", answer: "" }])}
              >
                <PiTrash size={25} />
              </Button>
            </Tooltip>
            <Tooltip
              content={
                isPublic ? "Deck is set to public" : "Deck is set to private"
              }
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
                onPress={() => setIsPublic(!isPublic)}
              >
                {isPublic ? (
                  <PiLockKeyOpen size={25} />
                ) : (
                  <PiLockKey size={25} />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>

        <Reorder.Group axis="y" values={cards} onReorder={setCards}>
          <div className="mt-5 flex flex-col gap-5 select-none">
            {cards.map((card, index) => {
              if (!card.isDeleted) {
                return (
                  <CreateCard
                    key={card.id}
                    card={card}
                    index={index}
                    updateCard={updateCard}
                    removeCard={removeCard}
                  />
                );
              }
            })}

            <div className="border-secondary/40 flex w-full flex-row flex-nowrap items-center justify-center gap-4 rounded-[20px] border-1 border-dashed p-4 md:rounded-[35px]">
              <Tooltip
                content="Add a new card"
                showArrow={true}
                delay={0}
                closeDelay={0}
                radius="full"
              >
                <Button
                  isIconOnly
                  variant="ghost"
                  color="secondary"
                  radius="full"
                  size="lg"
                  onPress={() => addCard()}
                >
                  <PiPlus size={25} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Reorder.Group>

        <div className="mt-5 flex flex-col-reverse justify-center gap-4 md:flex-row">
          <Button
            size="lg"
            radius="full"
            className="font-bold"
            color="default"
            onPress={() => navigate(ROUTES.DECK_DETAILS(id))}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            radius="full"
            className="font-bold"
            color="primary"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </Form>

      <Modal
        isOpen={isImportOpen}
        size="2xl"
        onClose={() => setIsImportOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="text-primary flex flex-col gap-1">
            Import Cards
            <p className="text-foreground text-sm">
              Import multiple cards at once by pasting CSV formatted text below.
              <br />
              Format: Each line should contain the front and back of a card,
              separated by a comma.
              <br />
              Example: &quot;Capital of France, Paris&quot;
            </p>
          </ModalHeader>
          <ModalBody>
            <Textarea
              isClearable
              variant="faded"
              color="secondary"
              label="Import cards"
              placeholder={
                "Capital of France, Paris\nSquare root of 16, 4\nAuthor of Hamlet, William Shakespeare\nLargest ocean, Pacific Ocean"
              }
              value={importedCards}
              onValueChange={setImportedCards}
              minRows={10}
              classNames={{
                inputWrapper: "rounded-[25px] px-5",
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              radius="full"
              className="font-bold"
              color="primary"
              onPress={() => importCards()}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditDeck;
