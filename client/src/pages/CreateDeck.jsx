import {
  PiDownloadSimple,
  PiTrash,
  PiLockKey,
  PiLockKeyOpen,
  PiPlus,
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
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { createDeck, generateDeck_V2 } from "@/api/decksAPI";
import { createCard } from "@/api/cardsAPI";
import languages from "@/data/languages.js";
import { ROUTES } from "@/routes/paths.js";
import Papa from "papaparse";
import StylishDiv from "@/components/StylishDiv";
import { Reorder } from "framer-motion";
import CreateCard from "@/components/CreateCard";
import AnoAI from "@/components/animated-shader-background";

const CreateDeck = () => {
  const { user, isUserLoaded, setIsLoginOpen, forceLogin } =
    useContext(UserContext);

  const [deckTitle, setDeckTitle] = useState("");
  const [deckDescription, setDeckDescription] = useState("");
  const [deckLanguages, setDeckLanguages] = useState([]);

  const [cards, setCards] = useState([{ id: 1, question: "", answer: "" }]);
  const [isPublic, setIsPublic] = useState(true);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importedCards, setImportedCards] = useState("");

  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isGenerateSubmitting, setIsGenerateSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isUserLoaded === true) {
      forceLogin();
    }
  }, [user, isUserLoaded]);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      question: "",
      answer: "",
      order: cards.length,
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

  const importCards = () => {
    Papa.parse(importedCards, {
      header: false,
      complete: function (results) {
        const filteredData = results.data.map((row, index) => ({
          id: cards.length + index + 1,
          question: row[0],
          answer: row[1],
          order: cards.length + index,
        }));
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
      const createdDeck = await createDeck({
        title: data.title,
        description: data.description,
        language: allLanguages,
        isPublic,
      });

      const cardPromises = cards.map((card, index) =>
        createCard({
          deckId: createdDeck._id,
          question: card.question,
          answer: card.answer,
          order: index,
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
    }
  };

  const generateDeck = async () => {
    setIsGenerateSubmitting(true);
    try {
      const generatedDeck = await generateDeck_V2(userPrompt);

      setDeckTitle(generatedDeck.deck.title);
      setDeckDescription(generatedDeck.deck.description);
      setDeckLanguages(generatedDeck.deck.languages);

      const adjustedCards = generatedDeck.cards.map((card, index) => ({
        id: new Date().getTime() + index,
        question: card.question.trim(),
        answer: card.answer.trim(),
        order: index,
      }));

      setCards(adjustedCards);
      addToast({
        title: "Deck generated",
        description: "Your AI-generated deck is ready, review and publish it!",
        color: "success",
        radius: "full",
      });
    } catch (err) {
      addToast({
        title: "Generation failed",
        description: err?.message || "Could not generate deck.",
        color: "danger",
        radius: "full",
      });
    } finally {
      setIsGenerateSubmitting(false);
      setIsGenerateOpen(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "Profile", path: ROUTES.PROFILE },
            { label: "Create A Deck", path: ROUTES.DECK_CREATE },
          ]}
        >
          Create A Deck
        </Title>
        <p className="mt-10 text-xl font-bold">
          You need to be logged in to create a deck.
        </p>
        <Button
          color="primary"
          onPress={() => setIsLoginOpen(true)}
          className="mt-4"
        >
          Login
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Profile", path: "/profile" },
            { label: "Create A Deck", path: "/deck/create" },
          ]}
        >
          Create A Deck
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
            value={deckTitle}
            onValueChange={setDeckTitle}
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
            value={deckDescription}
            onValueChange={setDeckDescription}
            className="items-center md:items-start"
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
            isRequired
            isClearable
            selectedKeys={deckLanguages}
            onSelectionChange={setDeckLanguages}
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
            <h3 className="text-secondary text-xl font-bold">Add cards</h3>
            <p>Below you can add new cards to your deck.</p>
          </div>

          <div className="flex items-center gap-4">
            <Tooltip content="Import Cards" showArrow radius="full">
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
            <Tooltip content="Delete Cards" showArrow radius="full">
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
              showArrow
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

            <Tooltip content="Generate Deck Using Ai" showArrow radius="full">
              <Button
                isIconOnly
                variant="faded"
                color="secondary"
                radius="full"
                size="lg"
                onPress={() => setIsGenerateOpen(true)}
              >
                AI
              </Button>
            </Tooltip>
          </div>
        </div>

        <Reorder.Group axis="y" values={cards} onReorder={setCards}>
          <div className="mt-5 flex flex-col gap-5 select-none">
            {cards.map((card, index) => (
              <CreateCard
                key={card.id}
                card={card}
                index={index}
                updateCard={updateCard}
                removeCard={removeCard}
              />
            ))}

            <div className="border-secondary/40 flex w-full items-center justify-center gap-4 rounded-[20px] border border-dashed p-4 md:rounded-[35px]">
              <Tooltip content="Add a new card" showArrow radius="full">
                <Button
                  isIconOnly
                  variant="ghost"
                  color="secondary"
                  radius="full"
                  size="lg"
                  onPress={addCard}
                >
                  <PiPlus size={25} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </Reorder.Group>

        <div className="mt-5 flex justify-center">
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
              classNames={{ inputWrapper: "rounded-[25px] px-5" }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              radius="full"
              className="font-bold"
              color="primary"
              onPress={importCards}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isGenerateOpen}
        backdrop="blur"
        size="2xl"
        onClose={() => setIsGenerateOpen(false)}
        classNames={{
          wrapper: "z-60 ",
          base: " bg-default-100 from-secondary/15 to-default-100 ring-default md:p-2 rounded-[20px] bg-radial-[at_50%_0%] p-0 to-100% ring-1 md:rounded-[35px]",
          // backdrop: "bg-[hsl(var(--heroui-background))]/10",
          backdrop: "bg-black/80",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="text-primary flex flex-col gap-1">
            Generate A Deck
            <p className="text-foreground text-sm">
              Type your prompt and let AI generate a deck for you!
            </p>
          </ModalHeader>
          <ModalBody>
            <Textarea
              isClearable
              variant="faded"
              color="secondary"
              label="Describe the topic for your deck"
              placeholder="e.g., Basic Spanish greetings for travel"
              minLength={3}
              value={userPrompt}
              onValueChange={setUserPrompt}
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
              onPress={() => {
                setUserPrompt("");
                setIsGenerateOpen(false);
              }}
              isDisabled={!user || isGenerateSubmitting}
            >
              Cancel
            </Button>
            <Button
              size="lg"
              radius="full"
              className="font-bold"
              color="primary"
              onPress={() => generateDeck()}
              isDisabled={!user || isGenerateSubmitting}
              isLoading={isGenerateSubmitting}
            >
              Generate
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isGenerateOpen && <AnoAI />}
    </>
  );
};

export default CreateDeck;
