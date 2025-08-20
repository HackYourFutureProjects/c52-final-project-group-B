import {
  DeleteIcon,
  AddIcon,
  LockedIcon,
  UnlockedIcon,
} from "@/components/Icons";
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
import { createCard, updateCardById, getCardsByDeckId } from "@/api/cardsAPI";
import languages from "@/data/languages.js";

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
        navigate("/not-found");
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
      setCards(cards.filter((card) => card.id !== cardId));
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

      navigate(`/decks/${id}`);
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
        <div className="bg-default-300 flex flex-col gap-3 rounded-[35px] p-8">
          <Input
            name="title"
            label="Enter Deck Title"
            type="text"
            radius="full"
            isRequired
            minLength={2}
            maxLength={100}
            defaultValue={deck?.title}
            classNames={{
              inputWrapper: "px-5",
            }}
          />
          <Textarea
            name="description"
            label="Description"
            placeholder="Enter Deck description"
            isRequired
            minLength={10}
            maxLength={500}
            defaultValue={deck?.description}
            classNames={{
              inputWrapper: "rounded-[25px] px-5",
            }}
          />
          <Select
            name="language"
            label="Language"
            radius="full"
            selectionMode="multiple"
            defaultSelectedKeys={deck?.language}
            isRequired
            isClearable
            classNames={{
              trigger: "px-5",
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
        </div>
        <div className="mt-20 flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">Edit cards</h3>
            <p className="text-default-500">
              Below you can modify existing cards or add new ones to your deck.
            </p>
          </div>
          <div className="flex items-center gap-3">
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
                radius="full"
                size="lg"
                onPress={() => setIsPublic(!isPublic)}
              >
                {isPublic ? (
                  <UnlockedIcon size={30} />
                ) : (
                  <LockedIcon size={30} />
                )}
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-default-300 flex w-full flex-row flex-nowrap items-center gap-3 rounded-[35px] p-3"
            >
              <div className="ml-2 text-xl font-bold">{index + 1}.</div>
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Input
                name={`question-${card.id}`}
                label="Enter the question"
                type="text"
                radius="full"
                value={card.question}
                onChange={(e) =>
                  updateCard(card.id, "question", e.target.value)
                }
                isRequired
                minLength={1}
                maxLength={100}
                classNames={{
                  inputWrapper: "px-5",
                }}
              />
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Input
                name={`answer-${card.id}`}
                label="Enter the answer"
                type="text"
                radius="full"
                value={card.answer}
                onChange={(e) => updateCard(card.id, "answer", e.target.value)}
                isRequired
                minLength={1}
                maxLength={100}
                classNames={{
                  inputWrapper: "px-5",
                }}
              />
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Tooltip
                content="Delete Card"
                showArrow={true}
                delay={0}
                closeDelay={0}
                radius="full"
              >
                <Button
                  isIconOnly
                  radius="full"
                  size="lg"
                  onPress={() => removeCard(card.id)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          ))}

          <div className="border-default flex w-full flex-row flex-nowrap items-center justify-center gap-3 rounded-[35px] border-1 border-dashed p-3">
            <Tooltip
              content="Add a new card"
              showArrow={true}
              delay={0}
              closeDelay={0}
              radius="full"
            >
              <Button
                isIconOnly
                radius="full"
                size="lg"
                onPress={() => addCard()}
              >
                <AddIcon size={24} />
              </Button>
            </Tooltip>
          </div>
        </div>
        <div className="mt-20 flex justify-center gap-4">
          <Button
            size="lg"
            radius="full"
            className="font-bold"
            color="default"
            onPress={() => navigate(`/decks/${id}`)}
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
