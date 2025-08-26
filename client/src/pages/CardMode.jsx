import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";
import Title from "@/components/Title";
import { DecksCard } from "@/components/Card";
import { Progress, Button, addToast } from "@heroui/react";
import { PiCheckBold, PiXBold, PiFlagFill } from "react-icons/pi";
import { submitUserProgress } from "@/api/userAPI";
import { ROUTES } from "@/routes/paths.js";
import {
  getCardProgress,
  saveCardProgress,
  markFinished,
  markSubmitted,
  unmarkSubmitted,
  clearCardProgress,
} from "@/util/cardProgress";
import ReportAProblemModal from "@/components/Modals/ReportAProblem";
import StylishDiv from "@/components/StylishDiv";

const CardMode = () => {
  const { user, isUserLoaded, setIsLoginOpen, forceLogin } =
    useContext(UserContext);

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [progress, setProgress] = useState([]);
  const [isReportAProblemOpen, setIsReportAProblemOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && isUserLoaded === true) {
      forceLogin();
    }
    const fetchDeckAndCards = async () => {
      try {
        const getDeck = await getDeckById(id);
        setDeck(getDeck);

        const getCards = await getCardsByDeckId(id);
        setCards(getCards);

        const saved = getCardProgress(id);
        if (saved) {
          setProgress(saved.results || []);

          // If the attempt was already submitted (e.g., user refreshed),
          // clear persisted data and redirect to avoid duplicate submissions.
          if (saved.submitted) {
            clearCardProgress(id);
            navigate(ROUTES.DECK_DETAILS(id));
            return;
          }

          // If the attempt was finished but not submitted, restore to the
          // finished screen instead of clamping back to the last card.
          if (saved.finished) {
            setCurrentCardIndex(getCards.length);
          } else {
            const savedIndex = saved.currentCardIndex || 0;
            const validIndex = Math.min(savedIndex, getCards.length - 1);
            setCurrentCardIndex(validIndex);
          }
        } else {
          setCurrentCardIndex(0);
        }
      } catch {
        navigate(ROUTES.NOT_FOUND);
      }
    };
    fetchDeckAndCards();
  }, [id, user, isUserLoaded]);

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl font-bold">
          You need to be logged in to access card mode.
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

  const handleAnswer = (isCorrect) => {
    const currentCard = cards[currentCardIndex];

    const newProgress = [
      ...progress,
      {
        cardId: currentCard._id,
        isCorrect,
      },
    ];

    setProgress(newProgress);

    const isLastCard = currentCardIndex >= cards.length - 1;

    saveCardProgress(id, {
      userId: user?.userid,
      results: newProgress,
      currentCardIndex: currentCardIndex + 1,
    });
    if (isLastCard) {
      markFinished(id);
    }

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Move to finished screen and let user submit manually
      setCurrentCardIndex(cards.length);
    }
  };

  const handleCompleteDeck = () => autoSubmit();

  const autoSubmit = async (finalResults = progress) => {
    try {
      if (isSubmitting) return;
      setIsSubmitting(true);
      const saved = getCardProgress(id);
      if (saved?.submitted) {
        navigate(ROUTES.DECK_DETAILS(id));
        return;
      }
      markSubmitted(id);

      const dataToSend = {
        userId: user?.userid,
        results: finalResults,
      };

      await submitUserProgress(dataToSend);

      setProgress([]);
      setCurrentCardIndex(0);
      clearCardProgress(id);
      addToast({
        title: "Deck Completed",
        description: `You have completed the deck "${deck.title}" in card mode.`,
        color: "success",
        radius: "full",
      });
      navigate(ROUTES.DECK_DETAILS(id));
    } catch {
      unmarkSubmitted(id);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasFinished = cards && currentCardIndex >= cards.length;

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: `Library`, path: `${ROUTES.DECKS}` },
            { label: `${deck?.title}`, path: ROUTES.DECK_DETAILS(id) },
            { label: `Card Mode`, path: ROUTES.DECK_CARD_MODE(id) },
          ]}
        >
          {deck?.title}
        </Title>
      </div>

      <StylishDiv className="mt-20 w-full">
        <Progress
          showValueLabel
          color="secondary"
          label="Current Progress"
          maxValue={cards?.length}
          value={progress.length}
          classNames={{
            label: "text-sm",
            value: "text-sm",
            track: "bg-secondary/20",
          }}
        />
      </StylishDiv>

      {hasFinished ? (
        <StylishDiv className="mt-5 flex flex-col items-center justify-between bg-radial-[at_50%_100%] text-center md:mt-10 md:p-20">
          <div className="text-md md:text-xl">
            <p>
              Thank you for completing the deck{" "}
              <span className="text-primary font-bold capitalize">
                &quot;{deck.title}&quot;
              </span>{" "}
              in card mode!
            </p>
            <p className="my-4">
              You’ve learned{" "}
              <strong className="text-primary">
                {progress?.filter((item) => item?.isCorrect).length}/
                {progress?.length}
              </strong>{" "}
              cards
            </p>
          </div>
        </StylishDiv>
      ) : (
        cards &&
        cards[currentCardIndex] && (
          <>
            <div className="mt-5 flex flex-wrap items-center justify-evenly gap-4 md:mt-10">
              <DecksCard
                key={cards[currentCardIndex]._id}
                front={cards[currentCardIndex].question}
                back={cards[currentCardIndex].answer}
                flipDirection="vertical"
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                color="danger"
                aria-label="Wrong answer"
                radius="full"
                size="lg"
                onPress={() => handleAnswer(false)}
                className="flex-1 md:flex-0"
              >
                <PiXBold size={30} />
              </Button>
              <div className="bg-default order-3 block w-full rounded-[35px] py-3 text-center text-lg font-bold md:order-none md:w-50">
                {currentCardIndex + 1} / {cards.length}
              </div>
              <Button
                color="success"
                aria-label="Correct answer"
                radius="full"
                size="lg"
                onPress={() => handleAnswer(true)}
                className="flex-1 md:flex-0"
              >
                <PiCheckBold size={30} />
              </Button>
            </div>

            <div className="mt-10 text-center">
              <p className="mb-2">
                If you encounter any issues with this deck, please report it.
              </p>
              <Button
                startContent={<PiFlagFill size={16} />}
                radius="full"
                size="sm"
                onPress={() => setIsReportAProblemOpen(true)}
              >
                Report a problem
              </Button>
            </div>

            <ReportAProblemModal
              isReportAProblemOpen={isReportAProblemOpen}
              setIsReportAProblemOpen={setIsReportAProblemOpen}
              sourceDetails={{
                deckId: deck?._id,
                deckTitle: deck?.title,
                cardId: cards[currentCardIndex]._id,
              }}
            />
          </>
        )
      )}

      {hasFinished && (
        <div className="mt-8 flex justify-center">
          <Button
            color="primary"
            radius="full"
            onPress={handleCompleteDeck}
            isDisabled={isSubmitting}
            className="w-50"
          >
            Complete
          </Button>
        </div>
      )}
    </>
  );
};

export default CardMode;
