import { useContext, useEffect, useState } from "react";
import Title from "@/components/Title";
import languages from "@/data/languages.js";
import {
  Form,
  Input,
  Textarea,
  Select,
  SelectItem,
  Button,
  addToast,
} from "@heroui/react";
import { generateDeck } from "@/api/decksAPI.js";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/paths.js";
import { UserContext } from "@/context/UserContext.jsx";

const GenerateDeck = () => {
  const navigate = useNavigate();
  const { user, isUserLoaded, forceLogin } = useContext(UserContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user && isUserLoaded === true) {
      forceLogin();
    }
  }, [user, isUserLoaded]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const form = new FormData(e.currentTarget);
    const language = [String(form.get("language") || "").trim()].filter(
      Boolean
    );
    const amountCards = Number(form.get("amountCards") || 20);
    const userPrompt = String(form.get("userPrompt") || "").trim();

    if (!language.length || !userPrompt) {
      addToast({
        title: "Missing fields",
        description: "Please select a language and enter a description.",
        color: "warning",
        radius: "full",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { deck } = await generateDeck({
        language,
        amountCards,
        userPrompt,
      });
      addToast({
        title: "Deck generated",
        description: "Your AI-generated deck is ready!",
        color: "success",
        radius: "full",
      });
      navigate(ROUTES.DECK_DETAILS(deck._id));
    } catch (err) {
      addToast({
        title: "Generation failed",
        description: err?.message || "Could not generate deck.",
        color: "danger",
        radius: "full",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Profile`, path: `/profile` },
            { label: `Generate A Deck`, path: ROUTES.DECK_GENERATE },
          ]}
        >
          Generate A Deck
        </Title>
      </div>

      <Form className="mt-20 items-stretch" onSubmit={onSubmit}>
        <div className="bg-default-300 flex flex-col gap-3 rounded-[35px] p-8">
          <Select
            name="language"
            label="Language"
            radius="full"
            isRequired
            classNames={{
              trigger: "rounded-[25px] px-3",
            }}
          >
            {languages.map((lang) => (
              <SelectItem
                key={lang.key}
                value={lang.key}
                textValue={lang.label}
              >
                {lang.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            name="amountCards"
            label="Number of cards"
            type="number"
            min={1}
            max={50}
            defaultValue={20}
            radius="full"
            classNames={{ inputWrapper: "px-5" }}
          />

          <Textarea
            name="userPrompt"
            label="Describe the topic for your deck"
            placeholder="e.g., Basic Spanish greetings for travel"
            isRequired
            minLength={3}
            maxLength={300}
            radius="full"
            classNames={{ inputWrapper: "px-5" }}
          />
        </div>

        <div className="mt-20 flex justify-center">
          <Button
            size="lg"
            radius="full"
            className="font-bold"
            color="primary"
            type="submit"
            isDisabled={!user || isSubmitting}
            isLoading={isSubmitting}
          >
            Generate Deck
          </Button>
        </div>
      </Form>
    </>
  );
};

export default GenerateDeck;
