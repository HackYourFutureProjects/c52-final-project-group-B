import {
  DeleteIcon,
  AddIcon,
  LockedIcon,
  UnlockedIcon,
} from "@/components/Icons";
import { LuImport } from "react-icons/lu";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "@/api/decksAPI";
import { createCard } from "@/api/cardsAPI";
import languages from "@/data/languages.js";
import { ROUTES } from "@/routes/paths.js";
import Papa from "papaparse";

const CreateDeck = () => {
  const [cards, setCards] = useState([{ cardId: 1, question: "", answer: "" }]);
  const [isPublic, setIsPublic] = useState(true);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importedCards, setImportedCards] = useState("");
  const navigate = useNavigate();

  const addCard = () => {
    const newCard = {
      cardId: cards.length + 1,
      question: "",
      answer: "",
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (cardId) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.cardId !== cardId));
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
        card.cardId === cardId ? { ...card, [field]: value } : card
      )
    );
  };

  const importCards = () => {
    Papa.parse(importedCards, {
      header: false,
      complete: function (results) {
        const filteredData = results.data.map((row, index) => {
          return {
            cardId: cards.length + index + 1,
            question: row[0],
            answer: row[1],
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

    try {
      const createdDeck = await createDeck({
        title: data.title,
        description: data.description,
        language: data.language,
        isPublic: isPublic,
      });

      const cardPromises = cards.map((card) =>
        createCard({
          deckId: createdDeck._id,
          question: card.question,
          answer: card.answer,
        })
      );

      await Promise.all(cardPromises);

      navigate(ROUTES.DECK_DETAILS(createdDeck._id));
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to create deck",
        color: "danger",
        radius: "full",
      });
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Profile`, path: `/profile` },
            { label: `Create A Deck`, path: `/deck/create` },
          ]}
        >
          Create A Deck
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
            classNames={{
              inputWrapper: "rounded-[25px] px-5",
            }}
          />
          <Select
            name="language"
            label="Language"
            radius="full"
            /* TODO: If multiple selection is needed in the future, add (selectionMode="multiple") to the Select component. */
            isRequired
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
            <h3 className="text-xl font-bold">Add cards</h3>
            <p className="text-default-500">
              Below you can add new cards to your deck.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip
              content="Import Cards"
              showArrow={true}
              delay={0}
              closeDelay={0}
              radius="full"
            >
              <Button
                isIconOnly
                radius="full"
                size="lg"
                onPress={() => setIsImportOpen(true)}
              >
                <LuImport size={26} />
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
                radius="full"
                size="lg"
                onPress={() =>
                  setCards([{ cardId: 1, question: "", answer: "" }])
                }
              >
                <DeleteIcon />
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
              key={card.cardId}
              className="bg-default-300 flex w-full flex-row flex-nowrap items-center gap-3 rounded-[35px] p-3"
            >
              <div className="ml-2 text-xl font-bold">{index + 1}.</div>
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Input
                name={`question-${card.cardId}`}
                label="Enter the question"
                type="text"
                radius="full"
                value={card.question}
                onChange={(e) =>
                  updateCard(card.cardId, "question", e.target.value)
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
                name={`answer-${card.cardId}`}
                label="Enter the answer"
                type="text"
                radius="full"
                value={card.answer}
                onChange={(e) =>
                  updateCard(card.cardId, "answer", e.target.value)
                }
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
                  onPress={() => removeCard(card.cardId)}
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
        <div className="mt-20 flex justify-center">
          <Button
            size="lg"
            radius="full"
            className="font-bold"
            color="primary"
            type="submit"
          >
            Save Deck
          </Button>
        </div>
      </Form>
      <Modal
        isOpen={isImportOpen}
        size="2xl"
        onClose={() => setIsImportOpen(false)}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Import Cards
            <p className="text-default-700 text-sm">
              Paste your cards in the text area below.
              <br />
              Each line represents a card and should be in the format
              &quot;Question, Answer&quot;. (Following csv format)
            </p>
          </ModalHeader>
          <ModalBody>
            <Textarea
              isClearable
              label="Import cards"
              placeholder={
                "Question 1, Answer 1\nQuestion 2, Answer 2\nQuestion 3, Answer 3\netc..."
              }
              value={importedCards}
              onValueChange={setImportedCards}
              minRows={10}
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

export default CreateDeck;
