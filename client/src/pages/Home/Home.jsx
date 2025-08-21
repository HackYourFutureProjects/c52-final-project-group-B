import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useJitterNumber from "@/hooks/useJitterNumber";
import { Button } from "@heroui/button";
import { Link } from "@heroui/react";
import Deck from "@/components/Deck";
import Title from "@/components/Title";
import Marquee from "@/components/Marquee";
import { getDecks } from "@/api/decksAPI";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ROUTES } from "@/routes/paths.js";
import { UserContext } from "@/context/UserContext";

const Home = () => {
  const [decks, setDecks] = useState([]);
  const { user, setIsLoginOpen } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const result = await getDecks();
        setDecks(result.items || []);
      } catch (e) {
        console.error(e);
        setDecks([]);
      }
    };
    fetchDecks();
  }, []);

  const activeUsers = useJitterNumber({
    start: 1573,
    min: 1500,
    max: 1850,
    interval: 6000,
    jitter: 3,
    persistKey: "stats_active",
  });

  const decksCreated = useJitterNumber({
    start: 13238,
    min: 11000,
    max: 25000,
    interval: 5500,
    jitter: 5,
    persistKey: "stats_decks",
  });

  const cardsLearned = useJitterNumber({
    start: 57872,
    min: 50000,
    max: 120000,
    interval: 5200,
    jitter: 7,
    persistKey: "stats_cards",
  });

  return (
    <>
      <div className="flex flex-col items-center gap-4 md:-mt-20 md:flex-row md:gap-8">
        <div className="my-10 mt-20 flex flex-col gap-4 text-center md:my-0 md:basis-2/5 md:text-left">
          <div className="mb-20 flex flex-col gap-1 md:mb-0">
            <Title className="text-primary">Study Your Way, Every Day</Title>
            <p className="text-secondary text-xl font-bold">
              Create. Flip. Master.
            </p>
          </div>
          <p>
            Memix is a playful, all-purpose flashcard app that helps you learn
            anything—faster. Create custom decks, flip through fun, focused
            cards, and boost your memory with smart repetition. Simple to use,
            fun to master.
          </p>
          <div className="flex flex-col gap-2 md:flex-row">
            <Button
              as={Link}
              variant="ghost"
              color="default"
              radius="full"
              href={ROUTES.BROWSE}
              className="font-bold"
            >
              Browse Decks
            </Button>
            {user ? (
              <Button
                as={Link}
                variant="ghost"
                color="primary"
                radius="full"
                href={ROUTES.DECK_CREATE}
                className="font-bold"
              >
                Create A Deck
              </Button>
            ) : (
              <Button
                variant="ghost"
                color="primary"
                radius="full"
                onPress={() => setIsLoginOpen(true)}
                className="font-bold"
              >
                Create A Deck
              </Button>
            )}
          </div>
        </div>
        <div className="pointer-events-none absolute top-0 z-[-1] flex w-full items-center justify-center overflow-hidden select-none md:relative md:basis-3/5">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden md:rotate-z-10">
            {decks.length > 0 && (
              <Marquee>
                {decks.slice(0, 2).map((deck) => (
                  <Deck key={deck._id} deck={deck} />
                ))}
              </Marquee>
            )}
            {decks.length > 2 && (
              <Marquee reverse>
                {decks.slice(3, 6).map((deck) => (
                  <Deck key={deck._id} deck={deck} />
                ))}
              </Marquee>
            )}

            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t"></div>
            <div className="bg-background/80 pointer-events-none absolute inset-0 md:hidden"></div>
          </div>
        </div>
      </div>

      <div className="bg-default-100 from-secondary/15 to-default-100 ring-default flex flex-col items-center gap-4 rounded-[20px] bg-radial-[at_50%_00%] to-100% p-4 text-center ring-1 md:rounded-[35px] md:to-50% md:p-8">
        <h2 className="heading-title text-secondary text-2xl font-bold">
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

      <div className="mt-4 grid grid-cols-1 gap-4 text-center md:grid-cols-3">
        <div className="ring-default bg-default-100 rounded-[20px] p-4 ring-1 md:rounded-[35px] md:p-8">
          <h3 className="text-secondary text-3xl font-black">
            {activeUsers.toLocaleString()}
          </h3>
          <p>Active User</p>
        </div>
        <div className="ring-default bg-default-100 rounded-[20px] p-4 ring-1 md:rounded-[35px] md:p-8">
          <h3 className="text-secondary text-3xl font-black">
            {decksCreated.toLocaleString()}
          </h3>
          <p>Decks Created</p>
        </div>
        <div className="ring-default bg-default-100 rounded-[20px] p-4 ring-1 md:rounded-[35px] md:p-8">
          <h3 className="text-secondary text-3xl font-black">
            {cardsLearned.toLocaleString()}
          </h3>
          <p>Cards Learned</p>
        </div>
      </div>

      <div className="bg-default-100 ring-default from-secondary/15 to-default-100 mt-10 flex flex-col items-center gap-4 rounded-[20px] bg-radial-[at_50%_00%] to-100% py-4 text-center ring-1 md:mt-20 md:gap-8 md:rounded-[35px] md:to-50% md:py-8">
        <h2 className="heading-title text-secondary text-2xl font-bold">
          Latest Decks
        </h2>
        <div className="flex w-full items-center justify-center">
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
            }}
            wrapperClass="pb-12"
            grabCursor={true}
            preventClicks={true}
            preventClicksPropagation={true}
            threshold={30}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
          >
            {decks &&
              decks.slice(0, 10).map((deck) => (
                <SwiperSlide
                  key={deck._id}
                  style={{ width: "auto" }}
                  className="px-4 py-2"
                >
                  <Deck
                    deck={deck}
                    className="w-full max-w-full min-w-[200px] md:max-w-[400px] md:min-w-[200px]"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
        <Button
          as={Link}
          color="primary"
          radius="full"
          size="lg"
          href={ROUTES.BROWSE}
          className="font-bold"
        >
          Browse Decks
        </Button>
      </div>

      <div className="relative -mx-4 -mb-10 overflow-hidden py-24 text-center">
        <h2 className="heading-title text-4xl font-bold uppercase">
          {user ? "Create your decks today" : "Join our community now"}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8">
          {user
            ? "Start creating your own decks and share your knowledge."
            : "Experience the benefits of our community. Just join and explore."}
        </p>

        <div className="mt-10 flex items-center justify-center">
          <Button
            color="primary"
            radius="full"
            size="lg"
            href="#"
            className="font-bold"
            onPress={() =>
              user ? navigate(ROUTES.DECK_CREATE) : setIsLoginOpen(true)
            }
          >
            {user ? "Create Now" : "Join Now"}
          </Button>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute top-1/2 left-1/2 -z-10 h-[72rem] w-[72rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#footer_gradient)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="footer_gradient">
              <stop stopColor="hsl(var(--heroui-primary))"></stop>
              <stop offset="1" stopColor="hsl(var(--heroui-primary))"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

export default Home;
