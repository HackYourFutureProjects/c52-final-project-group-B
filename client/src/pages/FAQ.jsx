import { Accordion, AccordionItem } from "@heroui/react";
import Title from "@/components/Title";
import { ROUTES } from "@/routes/paths.js";

export default function FAQ() {
  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "FAQ", path: ROUTES.FAQ },
          ]}
        >
          Frequently Asked Questions
        </Title>
      </div>

      <div className="mt-20 flex flex-col">
        <Accordion
          variant="splitted"
          itemClasses={{
            base: "bg-default-100 from-secondary/15 to-default-100 ring-default rounded-[20px] bg-radial-[at_50%_0%] to-100% ring-1 md:rounded-[35px] mb-5 px-5 shadow-none text-center md:text-left",
            title: "font-bold text-secondary text-center md:text-left",
            indicator: "text-secondary",
          }}
        >
          <AccordionItem
            key="what-is-memix"
            aria-label="What is Memix?"
            title="What is Memix?"
          >
            Memix is a simple flashcard app. Create decks, add question–answer
            cards, and study at your own pace using Card Mode.
          </AccordionItem>

          <AccordionItem
            key="start"
            aria-label="How do I start studying?"
            title="How do I start studying?"
          >
            Open any deck and choose Card Mode. Flip cards, mark correct or
            incorrect, and it will be saved so you can continue later from where
            you stopped.
          </AccordionItem>

          <AccordionItem
            key="create-deck"
            aria-label="Can I create my own deck?"
            title="Can I create my own deck?"
          >
            Yes. Go to Create a Deck, add a title, description, language, and
            your cards.
          </AccordionItem>

          <AccordionItem
            key="use-others"
            aria-label="Can I use decks from others?"
            title="Can I use decks from others?"
          >
            Yes. You can open a deck shared by someone else and study it in Card
            Mode directly.
          </AccordionItem>

          <AccordionItem
            key="language"
            aria-label="Do I need to study a language to use Memix?"
            title="Do I need to study a language to use Memix?"
          >
            Not at all! Memix is made for any topic. Whether you’re studying
            math, history, science, or just your grocery list — it’s your tool,
            your way.
          </AccordionItem>

          <AccordionItem
            key="mobile"
            aria-label="Does Memix work on mobile?"
            title="Does Memix work on mobile?"
          >
            Yes. The interface is responsive and works on phones, tablets, and
            desktops.
          </AccordionItem>

          <AccordionItem
            key="pricing"
            aria-label="Is Memix free?"
            title="Is Memix free?"
          >
            Yes! Memix is totally a free tool. You can create and study decks
            without any cost. We believe learning should be accessible to
            everyone.
          </AccordionItem>

          <AccordionItem
            key="modes"
            aria-label="Will you add new study modes?"
            title="Will you add new study modes?"
          >
            Card Mode, and Quiz Mode are available today. We focused on doing
            the basics well, and more study modes may be added in the future.
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
