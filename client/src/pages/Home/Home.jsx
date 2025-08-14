import { useEffect, useState } from "react";
import TEST_ID from "./Home.testid";
import { Button } from "@heroui/button";
import { Link } from "@heroui/react";
import Deck from "@/components/Deck";
import Title from "@/components/Title";
import Marquee from "@/components/Marquee";
import { getDecks } from "@/api/decksAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Home = () => {
  const [decks, setDecks] = useState([]);
  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const result = await getDecks();
        setDecks(result);
      } catch (e) {
        console.error(e);
      }
    };
    fetchDecks();
  }, []);

  return (
    <>
      <div
        className="-mt-20 flex flex-row items-center gap-8"
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
              href="/deck/create"
              className="font-bold"
            >
              Create A Deck
            </Button>
          </div>
        </div>
        <div className="pointer-events-none flex basis-3/5 items-center justify-center overflow-hidden rounded-[35px] select-none">
          <div className="relative flex h-full w-full rotate-z-10 flex-col items-center justify-center overflow-hidden">
            {decks.length > 0 && (
              <Marquee>
                {decks.slice(0, 2).map((deck) => (
                  <Deck
                    key={deck._id}
                    deckID={deck._id}
                    title={deck.title}
                    description={deck.description}
                    user={deck.userInfo?.username}
                    numCards={deck.cardsCount}
                  />
                ))}
              </Marquee>
            )}
            {decks.length > 2 && (
              <Marquee reverse>
                {decks.slice(2, 5).map((deck) => (
                  <Deck
                    key={deck._id}
                    deckID={deck._id}
                    title={deck.title}
                    description={deck.description}
                    user={deck.userInfo?.username}
                    numCards={deck.cardsCount}
                  />
                ))}
              </Marquee>
            )}

            <div className="dark:from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white"></div>
            <div className="dark:from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white"></div>
            <div className="dark:from-background pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white"></div>
            <div className="dark:from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white"></div>
          </div>
        </div>
      </div>

      <div className="bg-default-300 flex flex-col items-center gap-3 rounded-[35px] p-8">
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

      <div className="bg-default-300 mt-20 flex flex-col items-center gap-8 rounded-[35px] py-8 text-center">
        <h2 className="heading-title text-2xl font-bold">Latest Decks</h2>
        <div className="flex w-full items-center justify-center">
          <Swiper
            modules={[Pagination]}
            slidesPerView={"auto"}
            pagination={{
              clickable: true,
            }}
            wrapperClass="pb-12"
          >
            {decks &&
              decks.slice(0, 10).map((deck) => (
                <SwiperSlide
                  key={deck._id}
                  style={{ width: "auto" }}
                  className="px-4 py-2"
                >
                  <Deck
                    deckID={deck._id}
                    title={deck.title}
                    description={deck.description}
                    user={deck.userInfo?.username}
                    numCards={deck.cardsCount}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
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
    </>
  );
};

export default Home;
