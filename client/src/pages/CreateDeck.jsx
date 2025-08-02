import { DeleteIcon, AddIcon } from "@/components/Icons";
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
  Link,
  Tooltip,
  Divider,
} from "@heroui/react";
import { useState } from "react";

const languages = [
  { key: "english", label: "English", code: "us" },
  { key: "spanish", label: "Spanish", code: "es" },
  { key: "french", label: "French", code: "fr" },
  { key: "german", label: "German", code: "de" },
  { key: "italian", label: "Italian", code: "it" },
  { key: "portuguese", label: "Portuguese", code: "pt" },
  { key: "russian", label: "Russian", code: "ru" },
  { key: "chinese", label: "Chinese (Simplified)", code: "cn" },
  { key: "japanese", label: "Japanese", code: "jp" },
  { key: "korean", label: "Korean", code: "kr" },
  { key: "arabic", label: "Arabic", code: "sa" },
  { key: "hindi", label: "Hindi", code: "in" },
  { key: "bengali", label: "Bengali", code: "bd" },
  { key: "turkish", label: "Turkish", code: "tr" },
  { key: "vietnamese", label: "Vietnamese", code: "vi" },
  { key: "thai", label: "Thai", code: "th" },
  { key: "indonesian", label: "Indonesian", code: "id" },
  { key: "filipino", label: "Filipino", code: "tl" },
  { key: "swahili", label: "Swahili", code: "ke" },
  { key: "persian", label: "Persian (Farsi)", code: "ir" },
  { key: "dutch", label: "Dutch", code: "nl" },
  { key: "polish", label: "Polish", code: "pl" },
  { key: "ukrainian", label: "Ukrainian", code: "ua" },
  { key: "czech", label: "Czech", code: "cz" },
  { key: "hungarian", label: "Hungarian", code: "hu" },
  { key: "swedish", label: "Swedish", code: "sv" },
  { key: "norwegian", label: "Norwegian", code: "no" },
  { key: "danish", label: "Danish", code: "dk" },
  { key: "finnish", label: "Finnish", code: "fi" },
  { key: "greek", label: "Greek", code: "gr" },
];

const CreateDeck = () => {
  const [cards, setCards] = useState([{ id: 1, question: "", answer: "" }]);

  const addCard = () => {
    const newCard = {
      id: cards.length + 1,
      question: "",
      answer: "",
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id) => {
    if (cards.length > 1) {
      setCards(cards.filter((card) => card.id !== id));
    } else {
      addToast({
        title: "Error",
        description: "At least one card is required",
        color: "danger",
        radius: "full",
      });
    }
  };

  const updateCard = (id, field, value) => {
    setCards(
      cards.map((card) => (card.id === id ? { ...card, [field]: value } : card))
    );
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Dashboard`, path: `/dashboard` },
            { label: `Create A Deck`, path: `/deck/create` },
          ]}
        >
          Create A Deck
        </Title>
      </div>

      <Form className="mt-20 items-stretch">
        <div className="bg-default-200 flex flex-col gap-3 rounded-[35px] p-8">
          <Input
            label="Enter Deck Title"
            type="text"
            radius="full"
            isRequired
            minLength={2}
            maxLength={100}
            classNames={{
              inputWrapper:
                "bg-white data-[hover=true]:bg-default-100 data-[focus=true]:bg-default-100 px-5",
            }}
          />
          <Textarea
            label="Description"
            placeholder="Enter Deck description"
            isRequired
            minLength={10}
            maxLength={500}
            classNames={{
              inputWrapper:
                "bg-white data-[hover=true]:bg-default-100 data-[focus=true]:bg-default-100 rounded-[25px] px-5",
            }}
          />
          <Select
            label="Language"
            radius="full"
            // selectionMode="multiple"
            isRequired
            classNames={{
              trigger:
                "bg-white data-[hover=true]:bg-default-100 data-[focus=true]:bg-default-100 px-5",
            }}
          >
            {languages.map((language) => (
              <SelectItem
                key={language.key}
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
            <p className="text-gray-500">
              Below you can add new cards to your deck.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Tooltip
              content="Delete Deck"
              showArrow={true}
              delay={0}
              closeDelay={0}
              radius="full"
            >
              <Button
                as={Link}
                href="#"
                isIconOnly
                radius="full"
                size="lg"
                className="p-3"
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="bg-default-200 flex w-full flex-row flex-nowrap items-center gap-3 rounded-[35px] p-3"
            >
              <div className="ml-2 text-xl font-bold">{index + 1}.</div>
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Input
                label="Enter the question"
                type="text"
                radius="full"
                value={card.question}
                onChange={(e) =>
                  updateCard(card.id, "question", e.target.value)
                }
                isRequired
                minLength={2}
                maxLength={100}
                classNames={{
                  inputWrapper:
                    "bg-white data-[hover=true]:bg-default-100 data-[focus=true]:bg-default-100 px-5",
                }}
              />
              <Divider orientation="vertical" className="h-10 w-[2px]" />
              <Input
                label="Enter the answer"
                type="text"
                radius="full"
                value={card.answer}
                onChange={(e) => updateCard(card.id, "answer", e.target.value)}
                isRequired
                minLength={2}
                maxLength={100}
                classNames={{
                  inputWrapper:
                    "bg-white data-[hover=true]:bg-default-100 data-[focus=true]:bg-default-100 px-5",
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
                  className="p-3"
                  onPress={() => removeCard(card.id)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </div>
          ))}

          <div className="border-default-600 flex w-full flex-row flex-nowrap items-center justify-center gap-3 rounded-[35px] border-1 border-dashed p-3">
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
                className="p-3"
                onPress={() => addCard()}
              >
                <AddIcon />
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
            onPress={() => {}}
          >
            Save Deck
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreateDeck;
