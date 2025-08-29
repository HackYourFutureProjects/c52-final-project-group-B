import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";
import Title from "@/components/Title";
import { Progress, Button, addToast } from "@heroui/react";
import { PiFlagFill } from "react-icons/pi";
import { ROUTES } from "@/routes/paths.js";
import ReportAProblemModal from "@/components/Modals/ReportAProblem";
import StylishDiv from "@/components/StylishDiv";

const QuizMode = () => {
  const { user, isUserLoaded, setIsLoginOpen, forceLogin } =
    useContext(UserContext);

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [quizSize, setQuizSize] = useState(25);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [progress, setProgress] = useState([]);
  const [isReportAProblemOpen, setIsReportAProblemOpen] = useState(false);

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

        const numberOfCards = getCards.length;
        if (numberOfCards < quizSize) {
          if (numberOfCards <= 5) {
            setQuizSize(numberOfCards);
          } else {
            const calculateQuizSize = Math.max(Math.ceil(numberOfCards / 2), 5);
            setQuizSize(calculateQuizSize);
          }
        }

        const savedProgress = localStorage.getItem(`quizProgress-${id}`);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          const savedIndex = parsed.currentCardIndex || 0;
          const validIndex = Math.min(savedIndex, getCards.length - 1);
          setProgress(parsed.results || []);
          setCurrentCardIndex(validIndex);
        }
      } catch (e) {
        console.error(e);
        navigate(ROUTES.NOT_FOUND);
      }
    };
    fetchDeckAndCards();
  }, [id, user, isUserLoaded]);

  useEffect(() => {
    if (user && isUserLoaded && cards && progress && currentCardIndex === 0) {
      setCurrentCardIndex(randomCard());
    }
  }, [cards]);

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-xl font-bold">
          You need to be logged in to access quiz mode.
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

  const handleAnswer = (answer) => {
    const currentCard = cards[currentCardIndex];

    const isCorrect = answer === currentCard.answer;

    const newProgress = [
      ...progress,
      {
        cardId: currentCard._id,
        isCorrect,
      },
    ];

    setProgress(newProgress);

    const nextCardIndex = randomCard(newProgress);

    const dataToSave = {
      userId: user?.userid,
      results: newProgress,
      currentCardIndex: nextCardIndex,
    };

    localStorage.setItem(`quizProgress-${id}`, JSON.stringify(dataToSave));
    setCurrentCardIndex(nextCardIndex);
  };

  const handleCompleteDeck = async () => {
    setProgress([]);
    setCurrentCardIndex(0);
    localStorage.removeItem(`quizProgress-${id}`);
    addToast({
      title: "Deck Completed",
      description: `You have completed the deck "${deck.title}" in quiz mode.`,
      color: "success",
      radius: "full",
    });
    navigate(ROUTES.DECK_DETAILS(id));
  };

  const randomCard = (currentProgress = progress) => {
    const answeredIds = new Set(currentProgress.map((item) => item.cardId));
    const unAnsweredCards = cards.filter((card) => !answeredIds.has(card._id));
    if (unAnsweredCards.length === 0) {
      return -1;
    }
    const randomIndex = Math.floor(Math.random() * unAnsweredCards.length);
    return cards.indexOf(unAnsweredCards[randomIndex]);
  };

  const randomAnswers = (currentCard) => {
    const correctAnswer = currentCard.answer;
    let otherAnswers = cards
      .filter((card) => card._id !== currentCard._id)
      .map((card) => card.answer)
      .sort(() => Math.random() - 0.5);

    const wrongAnswers =
      otherAnswers.length < 3
        ? otherAnswers.slice(0, 1)
        : otherAnswers.slice(0, 3);

    const shuffledAnswers = [correctAnswer, ...wrongAnswers].sort(
      () => Math.random() - 0.5
    );

    return shuffledAnswers;
  };

  const hasFinished = cards && progress.length >= quizSize;

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: ROUTES.HOME },
            { label: "Browse Decks", path: ROUTES.BROWSE },
            { label: `${deck?.title}`, path: ROUTES.DECK_DETAILS(id) },
            { label: "Quiz Mode", path: ROUTES.DECK_QUIZ_MODE(id) },
          ]}
        >
          {deck?.title}
        </Title>
      </div>

      {cards && (
        <>
          <StylishDiv className="mt-20 w-full">
            <Progress
              color="primary"
              label="Current Progress"
              maxValue={quizSize}
              showValueLabel={true}
              valueLabel={`${progress.length} / ${quizSize}`}
              value={progress.length}
              classNames={{ track: "bg-primary/10" }}
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
                  in quiz mode!
                </p>
                <p className="my-4">
                  You’ve answered{" "}
                  <strong className="text-primary">
                    {progress?.filter((item) => item?.isCorrect).length}
                    <span className="text-foreground font-normal">
                      {" "}
                      out of{" "}
                    </span>
                    {quizSize}
                  </strong>{" "}
                  questions correctly.
                </p>
              </div>
              <Button
                color="primary"
                radius="full"
                onPress={handleCompleteDeck}
                className="w-50"
              >
                Complete
              </Button>
            </StylishDiv>
          ) : (
            <>
              <StylishDiv className="mt-5 flex min-h-90 w-full flex-col items-center justify-between bg-radial-[at_50%_100%] text-center md:mt-10">
                <div className="text-secondary flex flex-3 items-center justify-center text-2xl font-bold">
                  {cards[currentCardIndex].question}
                </div>
                <div className="mt-4 grid w-full grid-cols-1 gap-2 text-center md:mt-8 md:grid-cols-2 md:gap-4">
                  {cards &&
                    randomAnswers(cards[currentCardIndex]).map(
                      (answer, index) => (
                        <Button
                          key={index}
                          size="lg"
                          radius="full"
                          variant="ghost"
                          color="secondary"
                          onPress={() => handleAnswer(answer)}
                          className="h-auto py-2 whitespace-normal"
                        >
                          {answer}
                        </Button>
                      )
                    )}
                </div>
              </StylishDiv>

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
          )}
        </>
      )}
    </>
  );
};

export default QuizMode;
