import TEST_ID from "./Home.testid";
import Title from "@/components/Title";
import { Button } from "@heroui/button";
import { Link, Accordion, AccordionItem } from "@heroui/react";

const Home = () => {
  return (
    <>
      <div
        className="flex flex-row items-center gap-8"
        data-testid={TEST_ID.container}
      >
        <div className="flex basis-2/5 flex-col gap-5">
          <div className="flex flex-col gap-1">
            <Title>Study Your Way, Every Day</Title>
            <p className="text-xl font-bold">Create. Flip. Master.</p>
          </div>
          <p>
            Memix is a playful, all-purpose flashcard app that helps you learn
            anything—faster. Create custom decks, flip through fun, focused
            cards, and boost your memory with smart repetition. Simple to use,
            fun to master.
          </p>
          <div className="flex flex-row gap-2">
            <Button
              as={Link}
              variant="ghost"
              color="default"
              radius="full"
              href="#"
              className="font-bold"
            >
              Browse Decks
            </Button>
            <Button
              as={Link}
              variant="ghost"
              color="primary"
              radius="full"
              href="#"
              className="font-bold"
            >
              Sign up
            </Button>
          </div>
        </div>
        <div className="bg-primary-300 flex h-100 basis-3/5 items-center justify-center rounded-[35px]">
          A placeholder for the Marquee component
        </div>
      </div>

      <div className="bg-default-300 mt-20 flex flex-col items-center gap-3 rounded-[35px] p-8">
        <h2 className="heading-title text-2xl font-bold">
          Your Learning Companion
        </h2>
        <p className="max-w-3xl text-center">
          With Memix, learning is as simple as flipping a card. Create custom
          decks for any topic, review them at your own pace, and let smart
          repetition help you remember more with less effort. Whether you’re
          studying for a test, picking up a new skill, or just keeping your
          brain active, Memix makes it easy—and fun.
        </p>
      </div>

      <div className="mt-3 flex flex-row items-stretch justify-center gap-3 text-center">
        <div className="bg-default-300 flex-1 rounded-[35px] p-8">
          <h3 className="text-3xl font-black">1,573</h3>
          <p>Active User</p>
        </div>
        <div className="bg-default-300 flex-1 rounded-[35px] p-8">
          <h3 className="text-3xl font-black">13,238</h3>
          <p>Decks Created</p>
        </div>
        <div className="bg-default-300 flex-1 rounded-[35px] p-8">
          <h3 className="text-3xl font-black">57,872</h3>
          <p>Cards Learned</p>
        </div>
      </div>

      <div className="bg-default-300 mt-20 flex flex-col items-center gap-8 overflow-hidden rounded-[35px] p-8 text-center">
        <h2 className="heading-title text-2xl font-bold">Trending Decks</h2>
        <div className="flex w-[120%] justify-center gap-4">
          <div className="bg-default-600 h-70 w-130 rounded-[35px]"></div>
          <div className="bg-default-600 h-70 w-130 rounded-[35px]"></div>
          <div className="bg-default-600 h-70 w-130 rounded-[35px]"></div>
          <div className="bg-default-600 h-70 w-130 rounded-[35px]"></div>
          <div className="bg-default-600 h-70 w-130 rounded-[35px]"></div>
        </div>
        <Button
          as={Link}
          variant="ghost"
          color="primary"
          radius="full"
          size="lg"
          href="#"
          className="font-bold"
        >
          Browse Decks
        </Button>
      </div>

      <div className="my-20 flex flex-col gap-8 text-center">
        <h2 className="heading-title text-2xl font-bold">FAQ</h2>
        <Accordion
          showDivider={false}
          itemClasses={{
            base: "border-1 border-default rounded-[35px] my-4 px-8 text-left",
            title: "font-bold",
          }}
        >
          <AccordionItem
            key="1"
            aria-label="What is Memix used for?"
            title="What is Memix used for?"
          >
            Memix is a flexible flashcard app that helps you learn and remember
            anything — from school subjects and languages to trivia, reminders,
            or personal notes.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Do I need to study a language to use Memix?"
            title="Do I need to study a language to use Memix?"
          >
            Not at all! Memix is made for any topic. Whether you’re studying
            math, history, science, or just your grocery list — it’s your tool,
            your way.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="Is Memix free to use?"
            title="Is Memix free to use?"
          >
            Yes! Memix is totally a free tool. You can create and study decks
            without any cost. We believe learning should be accessible to
            everyone.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="Can I share decks with friends or students?"
            title="Can I share decks with friends or students?"
          >
            Yes! You can create and share your decks with anyone. It’s perfect
            for study groups, classrooms, or just learning together.
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default Home;
