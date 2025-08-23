import { PiTrash, PiLockKey, PiLockKeyOpen, PiPlus } from "react-icons/pi";
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
  Divider,
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
import StylishDiv from "@/components/StylishDiv";

const EditDeck = () => {
  const [cards, setCards] = useState([]);
  const [isPublic, setIsPublic] = useState(false);
  const [deck, setDeck] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckAndCards = async () => {
      try {
        const deckData = await getDeckById(id);
        setDeck(deckData);
        setIsPublic(deckData.isPublic);

        const cardsData = await getCardsByDeckId(id);
        const formattedCards = cardsData.map((card) => ({
          id: card._id,
          question: card.question,
          answer: card.answer,
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

      cards.forEach((card) => {
        if (card.isNew && card.question && card.answer) {
          cardPromises.push(
            createCard({
              deckId: id,
              question: card.question,
              answer: card.answer,
            })
          );
        } else if (!card.isNew && card.isDeleted) {
          cardPromises.push(deleteCardById(id, card.id));
        } else if (!card.isNew && card.question && card.answer) {
          cardPromises.push(
            updateCardById(id, card.id, {
              question: card.question,
              answer: card.answer,
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
            { label: `Deck: ${deck?.title}`, path: `/deck/${id}` },
            { label: `Edit Deck`, path: `/deck/${id}/edit` },
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

        <div className="mt-5 flex flex-col gap-5">
          {cards.map((card, index) => {
            if (!card.isDeleted) {
              return (
                <StylishDiv
                  key={card.cardId}
                  className="flex w-full flex-col items-center p-4 md:flex-row md:flex-nowrap md:p-4"
                >
                  <div className="text-secondary ml-2 text-xl font-bold">
                    <span className="md:hidden">Card #</span>
                    {index + 1}
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
                    onChange={(e) =>
                      updateCard(card.id, "question", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateCard(card.id, "answer", e.target.value)
                    }
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
    </>
  );
};

export default EditDeck;
