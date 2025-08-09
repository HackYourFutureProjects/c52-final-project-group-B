import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";
import { getDeckById } from "@/api/decksAPI";
import { getCardsByDeckId } from "@/api/cardsAPI";
import Title from "@/components/Title";
import { DecksCard } from "@/components/Card";
import { Button, addToast } from "@heroui/react";
import { WrongIcon, CorrectIcon } from "@/components/Icons";
import { submitUserProgress } from "@/api/userAPI";

const CardMode = () => {
  const { user, isUserLoaded, setIsLoginOpen, forceLogin } =
    useContext(UserContext);

  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [progress, setProgress] = useState([]);

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

        const savedProgress = localStorage.getItem(`cardProgress-${id}`);
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          const savedIndex = parsed.currentCardIndex || 0;
          const validIndex = Math.min(savedIndex, getCards.length);
          setProgress(parsed.results || []);
          setCurrentCardIndex(validIndex);
        } else {
          setCurrentCardIndex(0);
        }
      } catch {
        navigate("/not-found");
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

    const dataToSave = {
      userId: user?.userid,
      results: newProgress,
      currentCardIndex: currentCardIndex + 1,
    };

    localStorage.setItem(`cardProgress-${id}`, JSON.stringify(dataToSave));

    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(cards.length);
    }
  };

  const handleCompleteDeck = async () => {
    try {
      const dataToSend = {
        userId: user?.userid,
        results: progress,
      };

      await submitUserProgress(dataToSend);

      setProgress([]);
      setCurrentCardIndex(0);
      localStorage.removeItem(`cardProgress-${id}`);
      addToast({
        title: "Deck Completed",
        description: `You have completed the deck "${deck.title}" in card mode.`,
        color: "success",
        radius: "full",
      });
      navigate(`/deck/${id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const hasFinished = cards && currentCardIndex >= cards.length;

  return (
    <>
      <div className="flex flex-col justify-center text-center">
        <Title
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: `Library`, path: `/library` },
            { label: `${deck?.title}`, path: `/deck/${id}` },
            { label: `Card Mode`, path: `/deck/card-mode/${id}` },
          ]}
        >
          {deck?.title}
        </Title>
      </div>

      {hasFinished ? (
        <div className="mt-20 text-center">
          <p className="mb-4 text-xl font-bold">
            Thank you for completing &quot;{deck.title}&quot; in card mode.{" "}
            <br></br>
            You’ve learned {progress?.filter((item) => item?.isCorrect).length}/
            {progress?.length} cards
          </p>
          <Button color="primary" onPress={handleCompleteDeck}>
            Complete
          </Button>
        </div>
      ) : (
        cards &&
        cards[currentCardIndex] && (
          <>
            <div className="mt-20 flex flex-wrap items-center justify-evenly gap-4">
              <DecksCard
                key={cards[currentCardIndex]._id}
                front={cards[currentCardIndex].question}
                back={cards[currentCardIndex].answer}
                flipDirection="vertical"
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Button
                color="danger"
                aria-label="Wrong answer"
                radius="full"
                size="lg"
                className="text-white"
                onPress={() => handleAnswer(false)}
              >
                <WrongIcon />
              </Button>
              <div className="block text-center text-lg font-bold">
                {currentCardIndex + 1} / {cards.length}
              </div>
              <Button
                color="success"
                aria-label="Correct answer"
                radius="full"
                size="lg"
                className="px-5 text-white"
                onPress={() => handleAnswer(true)}
              >
                <CorrectIcon />
              </Button>
            </div>
          </>
        )
      )}
    </>
  );
};

export default CardMode;
